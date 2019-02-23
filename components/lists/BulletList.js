import React from 'react'
import { FlatList, Text } from 'react-native'

export default class BulletList extends React.Component {
  renderItem = ({ item }) => (
    <Text style={this.props.itemStyle}>
      {`\u2022 ${item.key}`}
    </Text>
  )

  render () {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}
      />
    )
  }
}
