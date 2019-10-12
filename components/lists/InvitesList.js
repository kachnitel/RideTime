import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import RideItem from '../list_items/RideItem'

export default
@inject('EventStore')
@observer
class InvitesList extends Component {
  componentDidMount () {
    this.refresh()
  }

  refresh = () => {
    this.props.EventStore.loadInvites()
  }

  itemComponent = (item) => {
    // let event = this.props.EventStore.get(item)
    let event = item.item
    return <RideItem ride={event} />
    // console.log(Object.keys(item.item))
    // return <Text>{item.title}</Text>
  }

  render () {
    return (
      <ScrollView style={styles.scroll}>
        <FlatList
          data={this.props.EventStore.invites}
          renderItem={this.itemComponent}
          ListEmptyComponent={<Text>No pending invites</Text>}
          keyExtractor={(item, index) => 'index_' + index.toString()}
          onRefresh={this.refresh}
          refreshing={false}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%'
  }
})
