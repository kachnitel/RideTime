import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import InputTitle from './InputTitle'
import ModalViewMenu from '../modal/ModalViewMenu'

export default class SelectWithIcon extends React.Component {
  state = {
    menuVisible: false
  }

  showMenu = () => this.setState({ menuVisible: true })
  hideMenu = () => this.setState({ menuVisible: false })

  touchableField = () => <TouchableOpacity onPress={this.showMenu}>
    <View style={{
      ...styles.container,
      borderBottomColor: this.props.required && !this.props.value
        ? 'red'
        : Colors.tintColor
    }}>
      {this.props.value
        ? <View style={styles.innerContainer}>
          {this.props.options.find((option) => option.value === this.props.value).customIcon}
          <Text style={styles.text}>
            {this.props.options.find((option) => option.value === this.props.value).label}
          </Text>
        </View>
        : <Text style={{ ...styles.text, ...styles.placeholderText }}>{this.props.placeholder}</Text>}
    </View>
  </TouchableOpacity>

  renderFilterMenu = () => <ModalViewMenu
    isVisible={this.state.menuVisible}
    onBackdropPress={this.hideMenu}
    onBackButtonPress={this.hideMenu}
    onClose={this.hideMenu}
    options={this.props.options.map((option) => ({
      ...option,
      onPress: () => this.handleItemPress(option.value)
    }))}
  />

  handleItemPress = (value) => {
    this.hideMenu()
    this.props.onValueChange(value)
  }

  render () {
    return (
      <View {...this.props}>
        <InputTitle>{this.props.title}</InputTitle>
        {this.touchableField()}
        {this.renderFilterMenu()}
      </View>
    )
  }
}

SelectWithIcon.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string,
    customIcon: PropTypes.object.isRequired
  })),
  placeholder: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: Layout.window.wp(1),
    width: Layout.window.wp(65),
    backgroundColor: Colors.inputBackground
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: Layout.window.hp(2.5),
    color: Colors.inputText,
    textAlignVertical: 'center',
    paddingHorizontal: Layout.window.wp(5),
    height: Layout.window.hp(7)
  },
  placeholderText: {
    color: Colors.inputPlaceholder,
    paddingHorizontal: Layout.window.wp(1.5)
  }
})
