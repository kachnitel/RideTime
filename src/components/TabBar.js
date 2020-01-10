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
    let buttonWidth = (100 / this.props.options.length).toString() + '%'
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        {this.props.options.map((option, index) => <View
          style={{ width: buttonWidth }}
          key={'option_' + index + '_' + option.title}
        >
          <TabButton
            {...option}
            onPress={() => this.handleSelect(index)}
            active={index === this.state.activeIndex}
          />
        </View>)}
      </View>
    )
  }
}

TabBar.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    onPress: PropTypes.func,
    title: PropTypes.string,
    icon: PropTypes.string
  }))
}

const styles = StyleSheet.create({
  container: {
    height: Layout.window.hp(7),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
