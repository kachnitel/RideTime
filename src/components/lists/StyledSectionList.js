import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View, SectionList } from 'react-native'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import CountHeader from '../CountHeader'

/**
 * @export
 * @class StyledSectionList
 * @extends {Component}
 */
export default class StyledSectionList extends Component {
  state = {
    refreshing: false
  }

  touchableItem = ({ item, index, section }) => {
    return <TouchableOpacity onPress={() => this.props.onItemPress(item)}>
      {/* View here isolates TouchableOpacity's style from itemComponent
      https://github.com/facebook/react-native/issues/22751 */}
      <View style={styles.item}>
        {this.props.itemComponent(
          item,
          section
        )}
      </View>
    </TouchableOpacity>
  }

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

StyledSectionList.propTypes = {
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
  item: {
    marginVertical: Layout.window.hp(0.5),
    marginHorizontal: Layout.window.wp(1),
    padding: Layout.window.hp(0.5),
    backgroundColor: '#ccc6',
    borderRadius: Layout.window.hp(2)
  },
  header: {
    justifyContent: 'center',
    padding: Layout.window.hp(0.75),
    backgroundColor: '#fffb'
  },
  headerText: {
    color: Colors.tintColor
  }
})
