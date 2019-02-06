import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import PropTypes from 'prop-types'

export default class EditDescription extends React.Component {
  render () {
    return (
      <View {...this.props}>
        <Text style={styles.textItemTitle}>{this.props.title}</Text>
        <TextInput {...this.props} style={styles.textInput} placeholder={this.props.placeholder} multiline />
      </View>
    )
  }
}

EditDescription.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  textItemTitle: {
    color: '#fff',
    fontSize: Layout.window.hp(3),
    paddingBottom: Layout.window.hp(1)
  },
  textInput: {
    backgroundColor: '#fff',
    borderColor: Colors.darkBackground,
    borderWidth: 1,
    padding: Layout.window.hp(1),
    borderRadius: Layout.window.hp(1)
  }
})
