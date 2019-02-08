import React from 'react'
import { View, Text, StyleSheet, ViewPropTypes, TouchableOpacity } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Title from './Title';

export default class EditDateTime extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isDateTimePickerVisible: false
    }
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)

    this.props.onSelect(date)
    this.hideDateTimePicker()
  };

  render () {
    return (
      <View style={this.props.containerStyle}>
        {/* <Text>Show DatePicker</Text> */}
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode='datetime'
        />
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <Title>{this.props.title}</Title>
          <Text style={styles.textValue}>
            {this.props.value || this.props.placeholder}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

EditDateTime.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  containerStyle: ViewPropTypes.style
}

const styles = StyleSheet.create({
  textValue: {
    backgroundColor: '#555',
    color: '#fff',
    borderColor: Colors.darkBackground,
    borderWidth: 1,
    padding: Layout.window.hp(1),
    borderRadius: Layout.window.hp(1),
    height: Layout.window.hp(6)
  }
})
