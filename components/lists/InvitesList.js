import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, Text, View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import RideItem from '../list_items/RideItem'
import ButtonIcon from '../ButtonIcon'
import Header from '../Header'

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
    let event = item.item
    return <View>
      <RideItem ride={event} />
      <View style={styles.choicesContainer}>
        <ButtonIcon
          icon='add-circle-outline'
          text='Join'
          style={styles.respondButton}
          onPress={() => event.acceptInvite()}
        />
        <ButtonIcon
          icon='highlight-off'
          text='Dismiss'
          style={{ ...styles.respondButton, ...styles.dismissButton }}
          onPress={() => event.declineInvite()}
        />
      </View>
    </View>
  }

  render () {
    return (
      <ScrollView style={styles.scroll}>
        <Header style={styles.header}>Invites</Header>
        <FlatList
          data={this.props.EventStore.invites}
          renderItem={this.itemComponent}
          ListEmptyComponent={<Text>No pending invites</Text>}
          keyExtractor={(item, index) => 'index_' + index.toString()}
          onRefresh={this.refresh}
          refreshing={false}
          extraData={this.props.EventStore.invites.length}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%'
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  respondButton: {
    width: '40%',
    textAlign: 'center'
  },
  dismissButton: {
    backgroundColor: 'gray'
  },
  header: {
    textAlign: 'center'
  }
})
