import React from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'

export default class Form extends React.Component {
  _handleSelectPicture = (uri) => {
    this.props.UserStore.updateTempPicture(uri)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.wp(100),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})
