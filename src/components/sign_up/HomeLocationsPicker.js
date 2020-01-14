import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { MaterialIcons } from '@expo/vector-icons'
import InputTitle from '../form/InputTitle'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import ModalView from '../modal/ModalView'
import LocationList from '../location/LocationList'
import TabButtonSearch from '../TabButtonSearch'
import { Location } from '../../stores/LocationStore.mobx'

export default
@inject('LocationStore')
@observer
class HomeLocationsPicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      picked: props.value || [],
      loading: true,
      locations: []
    }
  }

  componentDidMount = () => {
    this.onSearchUpdate()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (JSON.stringify(this.state.picked) !== JSON.stringify(prevState.picked)) {
      this.props.onValueChange(this.state.picked)
    }
  }

  onSearchUpdate = async (val: String) => {
    this.setState({ loading: true })
    let locations = val
      ? await this.props.LocationStore.searchAsync(val)
      : await this.props.LocationStore.nearbyAsync(25)
    this.setState({
      locations: locations,
      loading: false
    })
  }

  /**
   * @memberof HomeLocationsPicker
   */
  renderSelectedItems = () => {
    return (
      <>
        {this.state.picked.length > 0 && this.state.picked.map((item) => {
          return (
            <View key={item} style={styles.selectedItemContainer}>
              <Text style={styles.selectedItemText} numberOfLines={1}>
                {this.props.LocationStore.get(item).name}
              </Text>
              <TouchableNativeFeedback onPress={() => this.removeItem(item)}>
                <MaterialIcons
                  name='clear'
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

  getListSections = () => {
    return [
      {
        title: 'Nearby locations',
        data: this.state.locations.filter((location) => !this.state.picked.includes(location.id))
      }
    ]
  }

  render () {
    let maxItems = 3
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <InputTitle>Local areas</InputTitle>
        <View style={styles.innerContainer}>
          {!this.state.loading && this.renderSelectedItems()}
          {this.state.picked.length < maxItems &&
            <TouchableNativeFeedback onPress={this.onShow}>
              <Text style={styles.placeholderText}>
                {this.state.picked.length > 0
                  ? `Tap here to add up to ${maxItems} locations...`
                  : 'Where do you ride most often?'}
              </Text>
            </TouchableNativeFeedback>
          }
        </View>
        <ModalView
          isVisible={this.state.visible}
          onBackButtonPress={this.onCancel}
          onBackdropPress={this.onCancel}
        >
          <View style={styles.locationList}>
            <LocationList
              sections={this.getListSections()}
              onLocationPress={this.onSelect}
            />
            <View style={styles.searchContainer}>
              <TabButtonSearch
                style={styles.search}
                icon='search'
                title='Search'
                onUpdate={this.onSearchUpdate}
              />
            </View>
            {this.state.loading && <ActivityIndicator style={styles.loadingIndicator} />}
          </View>
        </ModalView>
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
  onSelect = (newPicked: Location) => {
    let id = newPicked.id
    if (this.state.picked.indexOf(id) === -1) {
      this.setState((prevState) => ({
        picked: [...prevState.picked, id]
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
    padding: Layout.window.hp(1),
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: Colors.inputBackground
  },
  selectedItemContainer: {
    padding: Layout.window.hp(0.25),
    flexDirection: 'row',
    backgroundColor: Colors.inputBackgroundFocused,
    borderRadius: Layout.window.hp(2.75),
    maxWidth: '100%'
  },
  selectedItemText: {
    color: Colors.secondaryText,
    fontSize: Layout.window.hp(2.5),
    padding: Layout.window.hp(1)
  },
  selectedItemRemoveIcon: {
    padding: Layout.window.hp(0.5),
    margin: Layout.window.hp(0.25),
    color: Colors.listHeaderBackground,
    backgroundColor: Colors.inputBackground,
    borderRadius: Layout.window.hp(2.5)
  },
  placeholderText: {
    color: Colors.inputPlaceholder,
    fontSize: Layout.window.hp(2.5)
  },
  optionContainer: {
    height: Layout.window.hp(8),
    justifyContent: 'center',
    borderBottomColor: Colors.fadedText,
    borderBottomWidth: 1
  },
  optionText: {
    fontSize: Layout.window.hp(2.5),
    padding: Layout.window.hp(1)
  },
  locationList: {
    width: '100%',
    height: '100%' // REVIEW: Should be flexible
  },
  search: {
    padding: Layout.window.hp(2),
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  searchContainer: {
    height: Layout.window.hp(7),
    width: '100%',
    alignItems: 'center'
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: Layout.window.hp(10),
    alignSelf: 'center'
  }
})
