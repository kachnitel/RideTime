import React from 'react'
import { View, ViewPropTypes, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-native-modal-datetime-picker'
// import Title from './Title'
import EditDescription from './EditDescription'

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
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode='datetime'
        />
        {/* Android */}
        <TouchableOpacity activeOpacity={1} onPress={this.showDateTimePicker}>
          <EditDescription
            placeholder={this.props.placeholder}
            title={this.props.title}
            value={this.props.value}
            onTouchStart={() => this.showDateTimePicker} // iOS
            editable={false}
          />
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
