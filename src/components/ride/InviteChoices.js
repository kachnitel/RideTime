import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import ButtonIcon from '../form/ButtonIcon'

/**
 * REVIEW: Use TabBar
 * - changing style
 * - adds the loading functionality
 *   - can be useful in tab if only showing loading indicator
 *     in place of the currently loaded tab/action
 *   - optional to disable other buttons/tab while loading
 */
export default class InviteChoices extends Component {
  state = {
    loading: false
  }

  submit = (action: Function) => {
    this.setState({ loading: true })
    action()
  }

  render () {
    return this.state.loading
      ? <ActivityIndicator />
      : <View style={styles.choicesContainer}>
        {this.props.options.map((option: Object, index) => <ButtonIcon
          icon={option.icon}
          text={option.label}
          onPress={() => this.submit(option.action)}
          style={option.fade
            ? { ...styles.respondButton, ...styles.dismissButton }
            : styles.respondButton}
          key={'option_' + index + '_' + option.label}
        />)}
      </View>
  }
}

InviteChoices.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    fade: PropTypes.bool
  })).isRequired
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
