import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { observer, inject } from 'mobx-react/native'
import { MaterialIcons } from '@expo/vector-icons'
import DraggableFlatList from 'react-native-draggable-flatlist'
import StyledSectionList from '../../lists/StyledSectionList'
import TrailItem from './TrailItem'
import Colors from '../../../../constants/Colors'
import Layout from '../../../../constants/Layout'
import { Trail } from '../../../stores/TrailStore.mobx'
import DifficultyIcon from '../../icons/DifficultyIcon'
import Header from '../../Header'
import TrailFilter from './TrailFilter'
import InviteChoices from '../InviteChoices'

export default
@inject('TrailStore')
@observer
class SelectTrails extends Component {
  state = {
    selected: [],
    filter: {
      difficulty: [],
      search: ''
    }
  }

  waitTime = 300
  timeout = 0

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  handleFilterUpdate = (filter) => {
    this.setState({
      filter: filter
    })

    clearTimeout(this.timeout) // clears the old timer
    this.timeout = setTimeout(
      () => this.props.TrailStore.filter({ rid: this.props.location.id, ...filter }),
      this.waitTime
    )
  }

  selectTrail = (trail: Trail) => {
    if (!this.state.selected.includes(trail)) {
      this.setState((prevState) => ({
        selected: [...prevState.selected, trail]
      }))
    }
  }

  badge = (trail: Trail) => {
    let number = this.state.selected.indexOf(trail) + 1

    if (number > 0) {
      return <Text style={styles.badge}>{number}</Text>
    }
  }

  trailsList = () => {
    let trails = this.props.location.trails
    if (this.state.filter.difficulty.length > 0) {
      trails = trails.filter((trail) =>
        this.state.filter.difficulty.includes(trail.difficulty))
    }
    if (this.state.filter.search.length > 0) {
      trails = trails.filter((trail) =>
        trail.title.includes(this.state.filter.search.trim()))
    }

    return <StyledSectionList
      sections={[{ title: 'Trails', data: trails }]}
      onItemPress={this.selectTrail}
      itemComponent={(item) => <TrailItem
        trail={item}
        badge={this.badge(item)}
      />}
      windowSize={6}
      initialNumToRender={7}
    />
  }

  selectedList = () => <View style={styles.selectedListContainer}>
    <Header style={styles.selectedListHeader}>Selected trails</Header>
    <DraggableFlatList
      data={this.state.selected}
      extraData={this.state.selected.length}
      keyExtractor={(item) => 'trail_ ' + item.id}
      renderItem={this.selectedListItem}
      onDragEnd={({ data }) => this.setState({ selected: data })}
    />
  </View>

  selectedListItem = ({ item, index, drag, isActive }) => <TouchableOpacity onLongPress={drag}>
    <View style={isActive
      ? { ...styles.selectedItemContainer, ...styles.selectedItemContainerActive }
      : styles.selectedItemContainer
    }>
      <DifficultyIcon d={item.difficulty} size={Layout.window.hp(3)} />
      <Text style={styles.selectedItemText}>{item.title}</Text>
      <View style={styles.selectedItemIconContainer}>
        {this.removeSelectedIcon(item)}
        {this.moveSelectedIcon(drag)}
      </View>
    </View>
  </TouchableOpacity>

  removeSelectedIcon = (item) => <TouchableOpacity
    onPress={() => this.setState((prevState) => ({
      selected: prevState.selected.filter((current) => current !== item)
    }))}
  >
    <MaterialIcons
      name='clear'
      size={Layout.window.hp(3.5)}
      style={styles.selectedItemIcon}
    />
  </TouchableOpacity>

  moveSelectedIcon = (drag: Function) => <TouchableOpacity onPressIn={drag}>
    <MaterialIcons
      name='reorder'
      size={Layout.window.hp(3.5)}
      style={styles.selectedItemIcon}
    />
  </TouchableOpacity>

  bottomButtons = () => <InviteChoices options={[
    {
      icon: 'clear-all',
      label: 'Clear',
      fade: true,
      action: () => { this.setState({ selected: [] }) }
    },
    {
      icon: 'arrow-forward',
      label: 'Next',
      action: () => { this.props.onSubmit(this.state.selected) }
    }
  ]} />

  render () {
    return (
      <View style={styles.container}>
        <TrailFilter
          style={styles.filter}
          onFilterUpdate={this.handleFilterUpdate}
        />
        <View style={styles.trailsList}>
          {this.props.location.trails.length > 0
            ? this.trailsList()
            : <Text>No trails found in location.</Text>
          }
        </View>
        {this.state.selected.length > 0 && <View style={styles.selectedList}>
          {this.selectedList()}
        </View>}
        {this.state.selected.length > 0 && this.bottomButtons()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  badge: {
    backgroundColor: Colors.tintColor,
    color: '#fff',
    height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    width: Layout.window.wp(6),
    borderRadius: Layout.window.hp(1)
  },
  filter: {
    width: '100%',
    padding: Layout.window.wp(5)
  },
  trailsList: {
    flex: 65
  },
  selectedList: {
    flex: 35,
    backgroundColor: Colors.tintColor,
    padding: Layout.window.hp(2),
    width: '100%',
    paddingBottom: Layout.window.hp(3.5)
  },
  selectedListHeader: {
    color: '#fff'
  },
  selectedItemText: {
    padding: Layout.window.hp(1),
    color: '#fff'
  },
  selectedItemIcon: {
    padding: Layout.window.hp(0.5),
    margin: Layout.window.hp(0.25),
    color: '#fff6',
    backgroundColor: '#fff2',
    borderRadius: Layout.window.hp(2.5)
  },
  selectedItemIconContainer: {
    marginLeft: 'auto',
    flexDirection: 'row'
  },
  selectedItemContainer: {
    padding: Layout.window.hp(0.25),
    paddingLeft: Layout.window.hp(1),
    flexDirection: 'row',
    backgroundColor: '#fff2',
    borderRadius: Layout.window.hp(2.75),
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: Layout.window.hp(0.25)
  },
  selectedItemContainerActive: {
    backgroundColor: '#fff6'
  },
  selectedListContainer: {
    flex: 1
  }
})
