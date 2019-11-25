import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'
import AlternatingStyleList from '../lists/AlternatingStyleList'
import TrailItem from '../list_items/TrailItem'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import { Trail } from '../../stores/TrailStore.mobx'
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DifficultyIcon from '../icons/DifficultyIcon'
import Header from '../Header'
import Button from '../Button'
import { observer } from 'mobx-react/native'

export default
@observer
class SelectTrails extends Component {
  state = {
    selected: []
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

  trailsList = () => <ScrollView>
    <AlternatingStyleList
      items={this.props.location.trails}
      onItemPress={this.selectTrail}
      itemComponent={(item, style) => <TrailItem
        trail={item}
        style={style}
        badge={this.badge(item)}
      />}
      windowSize={9}
    />
  </ScrollView>

  selectedList = () => <ScrollView>
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
  </ScrollView>

  removeSelectedIcon = (item) => <View style={styles.selectedItemRemoveIconContainer}>
    <TouchableNativeFeedback
      onPress={() => this.setState((prevState) => ({
        selected: prevState.selected.filter((current) => current !== item)
      }))}
    >
      <Icon
        name='clear'
        size={Layout.window.hp(3.5)}
        style={styles.selectedItemRemoveIcon}
      />
    </TouchableNativeFeedback>
  </View>

  bottomButtons = () => <View style={styles.bottomButtons}>
    {
      this.state.selected.length > 0
        ? <>
          <Button
            title='Clear'
            onPress={() => { this.setState({ selected: [] }) }}
            color='gray'
            style={styles.bottomButton}
          />
          <Button
            title='Next'
            onPress={() => {}}
            style={styles.bottomButton}
          />
          </>
        : <Button
          title='Skip'
          onPress={() => {}}
          style={styles.bottomButton}
        />
    }
  </View>

  render () {
    return (
      <View style={styles.container}>
        {/* <Text>TODO: Filter</Text> */}
        <View style={styles.trailsList}>
          {this.trailsList()}
        </View>
        {this.state.selected.length > 0 && <View style={styles.selectedList}>
          {this.selectedList()}
        </View>}
        {this.bottomButtons()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  badge: {
    backgroundColor: Colors.tintColor,
    color: '#fff',
    marginLeft: 'auto',
    height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    width: Layout.window.wp(6),
    borderRadius: Layout.window.hp(1)
  },
  trailsList: {
    flex: 65
  },
  selectedList: {
    flex: 35,
    backgroundColor: Colors.tintColor,
    padding: Layout.window.hp(2)
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
    // FIXME: Fill width...getting sick of this stupid flex
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottomButton: {
    flex: 1
  }
})
