import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import ModalFilterPicker from 'react-native-modal-filter-picker'
import InputTitle from '../form/InputTitle'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import LocationsProvider from '../../providers/LocationsProvider'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class HomeLocationsPicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      picked: [],
      locations: []
    }
  }

  componentDidMount = () => {
    this.loadLocations()
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.props.onValueChange(this.state.picked)
  }

  loadLocations () {
    let locationsProvider = new LocationsProvider()
    locationsProvider.getLocations()
      .then((result) => {
        this.setState({ locations: result.map((value) => ({
          key: value.id,
          label: value.name
        })) })
      })
  }

  /**
   * @memberof HomeLocationsPicker
   */
  renderSelectedItems = () => {
    // console.log(this.state.locations, this.state.picked)
    return (
      <>
        {this.state.picked.length > 0 && this.state.picked.map((item) => {
          return (
            <View key={item} style={styles.selectedItemContainer}>
              <Text style={styles.selectedItemText} numberOfLines={1}>
                {this.state.locations.find((location) => (location.key === item)).label}
              </Text>
              <TouchableNativeFeedback onPress={() => this.removeItem(item)}>
                <Icon
                  name='highlight-off'
                  size={Layout.window.hp(3.5)}
                  style={styles.selectedItemRemoveIcon}
                />
              </TouchableNativeFeedback>
            </View>
          )
        })}
      </>
    )
  }

  render () {
    let maxItems = 3
    return (
      <View style={styles.container}>
        <InputTitle>Local areas</InputTitle>
        <View style={styles.innerContainer}>
          {this.renderSelectedItems()}
          {this.state.picked.length < maxItems &&
            <TouchableNativeFeedback onPress={this.onShow} >
              <Text style={styles.placeholderText}>
                {this.state.picked.length > 0
                  ? `Tap here to add up to ${maxItems} locations...`
                  : 'Where do you ride a lot?'}
              </Text>
            </TouchableNativeFeedback>
          }
        </View>
        <ModalFilterPicker
          visible={this.state.visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={this.state.locations}
        />
      </View>
    )
  }

  onShow = () => {
    this.setState({ visible: true })
  }

  /**
   * Add item to selected list
   *
   * @memberof HomeLocationsPicker
   */
  onSelect = (newPicked) => {
    if (this.state.picked.indexOf(newPicked) === -1) {
      this.setState((prevState) => ({
        picked: [...prevState.picked, newPicked]
      }))
    }

    this.setState({ visible: false })
  }

  /**
   * Delete item from selected list
   *
   * @memberof HomeLocationsPicker
   */
  removeItem = (item) => {
    this.setState((prevState) => ({
      picked: prevState.picked.filter((pickedItem) => pickedItem !== item)
    }))
  }

  onCancel = () => {
    this.setState({ visible: false })
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.wp(65),
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1
  },
  innerContainer: {
    flexWrap: 'wrap',
    padding: Layout.window.hp(1.5),
    flexDirection: 'row'
  },
  selectedItemContainer: {
    padding: Layout.window.hp(0.25),
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1);',
    borderRadius: Layout.window.hp(1),
    alignItems: 'center'
  },
  selectedItemText: {
    color: '#fff',
    fontSize: Layout.window.hp(2.5),
    padding: Layout.window.hp(1)
  },
  selectedItemRemoveIcon: {
    padding: Layout.window.hp(0.75),
    color: '#996633',
    backgroundColor: 'rgba(255,255,255,0.1);',
    borderRadius: Layout.window.hp(1)
  },
  placeholderText: {
    color: '#666',
    fontSize: Layout.window.hp(2.5)
  }
})
