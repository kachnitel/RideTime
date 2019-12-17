import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import ButtonIcon from '../form/ButtonIcon'

export default class InviteChoices extends Component {
  state = {
    loading: false
  }

  acceptInvite = () => {
    this.setState({ loading: true })
    this.props.acceptInvite()
  }

  declineInvite = () => {
    this.setState({ loading: true })
    this.props.declineInvite()
  }

  render () {
    return this.state.loading
      ? <ActivityIndicator />
      : <View style={styles.choicesContainer}>
        <ButtonIcon
          icon='add-circle-outline'
          text='Join'
          style={styles.respondButton}
          onPress={this.acceptInvite}
        />
        <ButtonIcon
          icon='highlight-off'
          text='Dismiss'
          style={{ ...styles.respondButton, ...styles.dismissButton }}
          onPress={this.declineInvite}
        />
      </View>
  }
}

InviteChoices.propTypes = {
  acceptInvite: PropTypes.func,
  declineInvite: PropTypes.func
}

const styles = StyleSheet.create({
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  respondButton: {
    width: '40%',
    textAlign: 'center'
  },
  dismissButton: {
    backgroundColor: 'gray'
  }
})
