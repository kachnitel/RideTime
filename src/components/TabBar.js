import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import TabButton from './TabButton'

export default class TabBar extends Component {
  state = {
    activeIndex: 0
  }

  handleSelect = (index: Number) => {
    this.setState({ activeIndex: index })
    this.props.options[index].onPress()
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.options.map((option, index) => <TabButton
          title={option.title}
          onPress={() => this.handleSelect(index)}
          style={{ width: Layout.window.wp(100 / this.props.options.length) }}
          key={'option_' + index + '_' + option.title}
          active={index === this.state.activeIndex}
        />)}
      </View>
    )
  }
}

TabBar.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    onPress: PropTypes.func,
    title: PropTypes.string
  }))
}

const styles = StyleSheet.create({
  container: {
    height: Layout.window.hp(6.5),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
