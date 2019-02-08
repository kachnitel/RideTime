import React from 'react'
import { View, TextInput, StyleSheet, ViewPropTypes } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import PropTypes from 'prop-types'
import Title from './Title'

export default class EditDescription extends React.Component {
  render () {
    return (
      <View style={this.props.containerStyle}>
        <Title>{this.props.title}</Title>
        <TextInput {...this.props} style={styles.textInput} placeholder={this.props.placeholder} multiline />
      </View>
    )
  }
}

EditDescription.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  containerStyle: ViewPropTypes.style
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#555',
    color: '#fff',
    borderColor: Colors.darkBackground,
    borderWidth: 1,
    padding: Layout.window.hp(1),
    borderRadius: Layout.window.hp(1)
  }
})
