import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { observer } from 'mobx-react/native'
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import AlternatingStyleList from '../../lists/AlternatingStyleList'
import TrailItem from './TrailItem'
import Colors from '../../../../constants/Colors'
import Layout from '../../../../constants/Layout'
import { Trail } from '../../../stores/TrailStore.mobx'
import DifficultyIcon from '../../icons/DifficultyIcon'
import Header from '../../Header'
import Button from '../../form/Button'
import TrailFilter from './TrailFilter'

export default
@observer
class SelectTrails extends Component {
  state = {
    selected: [],
    trails: []
  }

  componentDidMount = () => {
    this.setState({
      trails: this.props.location.trails
    })
  }

  handleFilterUpdate = (filter) => {
    let trails = this.props.location.trails
    if (filter.difficulties.length > 0) {
      trails = trails.filter((trail) =>
        filter.difficulties.includes(trail.difficulty))
    }
    if (filter.search.length > 0) {
      trails = trails.filter((trail) =>
        trail.title.includes(filter.search.trim()))
    }
    this.setState({
      trails: trails
    })
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

  trailsList = () => <AlternatingStyleList
    items={this.state.trails}
    onItemPress={this.selectTrail}
    itemComponent={(item, style) => <TrailItem
      trail={item}
      style={style}
      badge={this.badge(item)}
    />}
    windowSize={6}
    initialNumToRender={7}
  />

  selectedList = () => <View>
    <Header style={styles.selectedListHeader}>Selected trails</Header>
    <FlatList
      data={this.state.selected}
      extraData={this.state.selected}
      keyExtractor={(item) => 'trail_ ' + item.id}
      renderItem={({ item }) => <View style={styles.selectedItemContainer}>
        <DifficultyIcon d={item.difficulty} size={Layout.window.hp(3)} />
        <Text style={styles.selectedItemText}>{item.title}</Text>
        {this.removeSelectedIcon(item)}
      </View>}
    />
  </View>

  removeSelectedIcon = (item) => <View style={styles.selectedItemRemoveIconContainer}>
    <TouchableNativeFeedback
      onPress={() => this.setState((prevState) => ({
        selected: prevState.selected.filter((current) => current !== item)
      }))}
    >
      <MaterialIcons
        name='clear'
        size={Layout.window.hp(3.5)}
        style={styles.selectedItemRemoveIcon}
      />
    </TouchableNativeFeedback>
  </View>

  bottomButtons = () => <View style={styles.bottomButtons}>
    <Button
      title='Clear'
      onPress={() => { this.setState({ selected: [] }) }}
      color='gray'
      style={styles.bottomButton}
    />
    <Button
      title='Next'
      onPress={() => { this.props.onSubmit(this.state.selected) }}
      style={styles.bottomButton}
    />
  </View>

  render () {
    return (
      <View style={styles.container}>
        <TrailFilter
          style={styles.filter}
          onFilterUpdate={this.handleFilterUpdate}
        />
        <View style={styles.trailsList}>
          {this.state.trails.length > 0
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
    // marginLeft: 'auto',
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
  selectedItemRemoveIcon: {
    padding: Layout.window.hp(0.5),
    margin: Layout.window.hp(0.25),
    color: '#fff6',
    backgroundColor: '#fff2',
    borderRadius: Layout.window.hp(2.5)
  },
  selectedItemRemoveIconContainer: {
    marginLeft: 'auto'
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
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottomButton: {
    flex: 1
  }
})
