import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ModalFilterPicker from 'react-native-modal-filter-picker'
import InputTitle from '../form/InputTitle'
import Button from '../Button'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default class HomeLocationsPicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      picked: []
    }
  }

  /**
   * TODO:
   * - [ ] Get data from LocationsProvider
   * - [ ] Render item with label and a 'X' button
   * - [ ] Make it pretty :)
   * - [ ] Update store
   *
   * @memberof HomeLocationsPicker
   */
  renderSelectedItems = () => {
    return (
      <>
        {this.state.picked.length > 0 && this.state.picked.map((item) => {
          return (
            <Text key={item} style={styles.selectedItem}>{item}</Text>
          )
        })}
      </>
    )
  }

  render () {
    const options = [
      {
        key: 'kenya',
        label: 'Kenya'
      },
      {
        key: 'uganda',
        label: 'Uganda'
      },
      {
        key: 'libya',
        label: 'Libya'
      },
      {
        key: 'morocco',
        label: 'Morocco'
      },
      {
        key: 'estonia',
        label: 'Estonia'
      }
    ]

    return (
      <View style={styles.container}>
        <InputTitle>Local areas</InputTitle>
        {/* placeholder='Where do you ride a lot?' */}
        <View style={styles.innerContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={this.onShow} title='Add' />
          </View>
          {this.renderSelectedItems()}
        </View>
        <ModalFilterPicker
          visible={this.state.visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={options}
        />
      </View>
    )
  }

  onShow = () => {
    this.setState({ visible: true })
  }

  onSelect = (newPicked) => {
    if (this.state.picked.indexOf(newPicked) === -1) {
      this.setState((prevState) => ({
        picked: [...prevState.picked, newPicked]
      }))
    }

    this.setState({ visible: false })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
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
    flexDirection: 'row'
  },
  buttonContainer: {
    padding: Layout.window.hp(1),
    width: Layout.window.wp(15),
  },
  selectedItem: {
    padding: 5,
    color: '#fff'
  }
})
