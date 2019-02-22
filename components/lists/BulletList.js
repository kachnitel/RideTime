import React from 'react'
import { FlatList, Text } from 'react-native'

export default class BulletList extends React.Component {
  renderRow (data) {
    return (
      <Text>{`\u2022 ${data}`}</Text>
    )
  }

  render () {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item }) => <Text>{`\u2022 ${item.key}`}</Text>}
      />
    )
  }
}
