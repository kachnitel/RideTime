import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import ModalFilterPicker from 'react-native-modal-filter-picker'
import InputTitle from '../form/InputTitle'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { observer, inject } from 'mobx-react/native'

export default
@inject('LocationStore')
@observer
class HomeLocationsPicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      picked: this.props.value || [],
      loading: true,
      locations: []
    }
  }

  componentDidMount = async () => {
    let locations = await this.props.LocationStore.nearby(50)
    this.setState({
      loading: false,
      locations: locations
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (JSON.stringify(this.state.picked) !== JSON.stringify(prevState.picked)) {
      this.props.onValueChange(this.state.picked)
    }
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
                {this.props.LocationStore.getSync(item).name}
              </Text>
              <TouchableNativeFeedback onPress={() => this.removeItem(item)}>
                <Icon
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

  renderOption = ({ id, name }) => {
    if (this.state.picked.indexOf(id) !== -1) return <></>
    return (
      <TouchableNativeFeedback activeOpacity={0.7}
        onPress={() => this.onSelect(id)}
      >
        <View
          style={styles.optionContainer}
        >
          <Text style={styles.optionText}>{name}</Text>
        </View>
      </TouchableNativeFeedback>
    )
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
        <ModalFilterPicker
          visible={this.state.visible}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={this.state.locations.filter(
            (location) => !this.state.picked.includes(location)
          )}
          renderOption={this.renderOption}
          placeholderText='Search locations'
          autoFocus
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
    padding: Layout.window.hp(1),
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03);'
  },
  selectedItemContainer: {
    padding: Layout.window.hp(0.25),
    flexDirection: 'row',
    backgroundColor: '#fff2',
    borderRadius: Layout.window.hp(2.75),
    alignItems: 'center'
  },
  selectedItemText: {
    color: '#fff',
    fontSize: Layout.window.hp(2.5),
    padding: Layout.window.hp(1)
  },
  selectedItemRemoveIcon: {
    padding: Layout.window.hp(0.5),
    margin: Layout.window.hp(0.25),
    color: '#fff6',
    backgroundColor: '#fff2',
    borderRadius: Layout.window.hp(2.5)
  },
  placeholderText: {
    color: '#666',
    fontSize: Layout.window.hp(2.5)
  },
  optionContainer: {
    height: Layout.window.hp(8),
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  optionText: {
    fontSize: Layout.window.hp(2.5),
    padding: Layout.window.hp(1)
  }
})
