import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import TabButton from './TabButton'
import Colors from '../../constants/Colors'

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
        <View style={styles.tabs}>
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
        {this.props.children}
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
    flexDirection: 'row',
    height: Layout.window.hp(7),
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: Colors.appBackground
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1
  }
})
