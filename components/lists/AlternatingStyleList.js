import React, { Component } from 'react'
import { FlatList, StyleSheet, TouchableHighlight, View } from 'react-native'
import Colors from '../../constants/Colors'
import PropTypes from 'prop-types'

/**
 * @property function itemComponent with "item" and "style" params
 * - item contains the ListItem data
 * - style is style applied to ListItem from AlternatingStyleList
 *
 * @export
 * @class AlternatingStyleList
 * @extends {Component}
 */
export default class AlternatingStyleList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      refreshing: false
    }
  }

  touchableItem = ({ item, index }) => (
    <TouchableHighlight onPress={() => this.props.onItemPress(item)}>
      {/* View here isolates TouchableHighlight's style from itemComponent
      https://github.com/facebook/react-native/issues/22751 */}
      <View>
        {this.props.itemComponent(
          item,
          index % 2 === 0 ? styles.listItemWhite : styles.listItemBlack
        )}
      </View>
    </TouchableHighlight>
  )

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          renderItem={this.touchableItem}
          ListEmptyComponent={this.props.emptyComponent}
          keyExtractor={(item, index) => 'index_' + index.toString()}
          onRefresh={this.props.onRefresh}
          refreshing={this.state.refreshing}
        />
      </View>
    )
  }
}

AlternatingStyleList.propTypes = {
  onItemPress: PropTypes.func,
  items: PropTypes.array,
  emptyComponent: PropTypes.any,
  itemComponent: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
  },
  listItemWhite: {
    backgroundColor: '#fff'
  },
  listItemBlack: {
    backgroundColor: Colors.darkBackground,
    color: '#fff'
  }
})
