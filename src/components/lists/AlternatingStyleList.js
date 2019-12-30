import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableHighlight, View, SectionList } from 'react-native'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import CountHeader from '../CountHeader'

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

  touchableItem = ({ item, index, section }) => (
    <TouchableHighlight onPress={() => this.props.onItemPress(item)}>
      {/* View here isolates TouchableHighlight's style from itemComponent
      https://github.com/facebook/react-native/issues/22751 */}
      <View>
        {this.props.itemComponent(
          item,
          index % 2 === 0 ? styles.listItemWhite : styles.listItemBlack,
          section
        )}
      </View>
    </TouchableHighlight>
  )

  sectionHeader = ({ section: { title, data, countHighlight } }) =>
    title && (data.length > 0 || this.props.showEmptyHeader) &&
      <CountHeader
        containerStyle={styles.header}
        style={styles.headerText}
        number={data.length}
        countHighlight={countHighlight}
      >
        {title}
      </CountHeader>

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
    data: PropTypes.array,
    countHighlight: PropTypes.bool
  })),
  emptyComponent: PropTypes.any,
  itemComponent: PropTypes.func,
  keyExtractor: PropTypes.func,
  showEmptyHeader: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    justifyContent: 'center',
    padding: Layout.window.hp(0.75)
  },
  headerText: {
    color: '#fff'
  }
})
