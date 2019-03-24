import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import SelectDifficulty from './SelectDifficulty'
import EditDescription from './EditDescription'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import EditDateTime from './EditDateTime'
import Moment from 'moment'
import SelectTerrain from './SelectTerrain'
import { observer, inject } from 'mobx-react/native'

export default
@inject('Event')
@observer
class CreateRide extends React.Component {
  render () {
    return (
      <View {...this.props}>
        <TextInput
          style={styles.rideTitleInput}
          placeholder='Ride name'
          value={this.props.Event.title}
          onChangeText={(text) => this.props.Event.updateTitle(text)}
        />
        <SelectDifficulty
          onSelect={(d) => this.props.Event.updateDifficulty(d)}
          style={{ ...styles.itemContainer, ...styles.selectDifficulty }}
          selected={this.props.Event.difficulty}
          title='Tap to select difficulty'
        />
        <EditDateTime
          // FIXME: shouldn't need to recreate new Moment to display
          value={this.props.Event.datetime && new Moment(this.props.Event.datetime).format('llll')}
          onSelect={(dt) => this.props.Event.updateDatetime(new Moment(dt))}
          title='Select date and time'
          containerStyle={styles.itemContainer}
          placeholder='Tap to select'
        />
        <SelectTerrain
          onSelect={(t) => this.props.Event.updateTerrain(t)}
          style={{ ...styles.itemContainer, ...styles.selectTerrain }}
          selected={this.props.Event.terrain}
          title='What kind of a ride?'
        />
        <EditDescription
          title='Description'
          placeholder='Ride description'
          value={this.props.Event.description}
          containerStyle={styles.itemContainer}
          onChangeText={(desc) => this.props.Event.updateDescription(desc)}
        />
        <EditDescription
          title='Planned route'
          placeholder='Mashiter, 50 more shades, Rupert'
          value={this.props.Event.route}
          containerStyle={styles.itemContainer}
          onChangeText={(route) => this.props.Event.updateRoute(route)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectDifficulty: {
    height: Layout.window.wp(23)
  },
  selectTerrain: {
    height: Layout.window.wp(28)
  },
  rideTitleInput: {
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: Layout.window.hp(3.5),
    padding: Layout.window.hp(1.5),
    width: 'auto'
  },
  itemContainer: {
    backgroundColor: Colors.darkBackground,
    paddingVertical: Layout.window.hp(1),
    paddingHorizontal: Layout.window.wp(3)
  }
})
