import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableHighlight, View, SectionList } from 'react-native'
import Colors from '../../../constants/Colors'
import Header from '../Header'
import Layout from '../../../constants/Layout'

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
  state = {
    refreshing: false
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

  sectionHeader = ({ section: { title } }) => title && <Header style={styles.header}>{title}</Header>

  render () {
    return (
      <View style={styles.container}>
        <SectionList
          {...this.props}
          renderItem={this.touchableItem}
          renderSectionHeader={this.sectionHeader}
          ListEmptyComponent={this.props.emptyComponent}
          keyExtractor={typeof this.props.keyExtractor === 'function'
            ? this.props.keyExtractor
            : (item, index) => 'index_' + (item.id ?? index.toString())}
          refreshing={this.state.refreshing}
          stickySectionHeadersEnabled
        />
      </View>
    )
  }
}

AlternatingStyleList.propTypes = {
  onItemPress: PropTypes.func,
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    data: PropTypes.array
  })),
  emptyComponent: PropTypes.any,
  itemComponent: PropTypes.func,
  keyExtractor: PropTypes.func
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
  },
  header: {
    backgroundColor: Colors.tintColor,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: Layout.window.hp(0.75)
  }
})
