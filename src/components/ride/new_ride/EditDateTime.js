import React from 'react'
import { View, ViewPropTypes, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import TextInputWithTitle from '../../form/TextInputWithTitle'

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
    this.hideDateTimePicker()
    this.props.onSelect(date)
  };

  render () {
    return (
      <View style={this.props.containerStyle}>
        <DateTimePickerModal
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          minimumDate={new Date()}
          mode='datetime'
        />
        {/* Android */}
        <TouchableOpacity activeOpacity={1} onPress={this.showDateTimePicker}>
          <TextInputWithTitle
            placeholder={this.props.placeholder}
            title={this.props.title}
            value={this.props.value}
            onTouchStart={() => this.showDateTimePicker} // iOS
            editable={false}
            required
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
