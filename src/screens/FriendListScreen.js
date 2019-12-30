import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { inject, observer } from 'mobx-react/native'
import UsersList from '../components/user/UsersList'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Button from '../components/form/Button'
import FriendMenuModal from '../components/friends/FriendMenuModal'
import DrawerButton from '../components/navigation_header/DrawerButton'
import HeaderRightView from '../components/navigation_header/HeaderRightView'
import Header from '../components/Header'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class FriendListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Friends',
      headerLeft: <DrawerButton navigation={navigation} />,
      headerRight: <HeaderRightView>
        <Button
          title='Add'
          onPress={() => navigation.push('AddFriend')}
        />
      </HeaderRightView>
    }
  }

  state = {
    loading: true,
    friendMenuModalId: null,
    friendMenuModalVisible: false
  }

  // TODO: Soon (TM)
  // actions = [{
  //   icon: 'mail-outline',
  //   action: () => logger.info('Message ' + this.props.UserStore.currentUser.id)
  // }]

  actionsFriend = [
    {
      icon: 'more-vert',
      action: (id) => this.showFriendMenuModal(id)
    }
  ]

  actionsRequest = [
    {
      icon: 'person-add',
      action: (id) => this.props.UserStore.acceptFriendRequest(id)
    },
    {
      icon: 'block',
      action: (id) => this.props.UserStore.declineFriendRequest(id)
    }
  ]

  showFriendMenuModal = (id: Number) => {
    this.setState({
      friendMenuModalId: id,
      friendMenuModalVisible: true
    })
  }

  hideFriendMenuModal = () => {
    this.setState({
      friendMenuModalId: null,
      friendMenuModalVisible: false
    })
  }

  async componentDidMount () {
    this.refresh()
  }

  refreshControl () {
    return <RefreshControl
      refreshing={this.state.loading}
      onRefresh={this.refresh}
    />
  }

  refresh = async () => {
    this.setState({ loading: true })
    await this.props.UserStore.loadFriends()
    this.setState({ loading: false })
  }

  render () {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.refreshControl()}
      >
        {this.props.UserStore.friendRequests.length > 0 && this.friendRequestList()}
        {this.friendList()}
        <FriendMenuModal
          visible={this.state.friendMenuModalVisible}
          userId={this.state.friendMenuModalId}
          hide={this.hideFriendMenuModal}
        />
        {this.state.loading && <ActivityIndicator />}
      </ScrollView>
    )
  }

  friendRequestList = () => <UsersList
    sections={[{
      title: <Header>
        Friend requests
        <Header style={styles.headerCount}> {this.props.UserStore.friendRequests.length}</Header>
      </Header>,
      data: this.props.UserStore.friendRequests
    }]}
    style={styles.list}
    actions={this.actionsRequest}
  />

  friendList = () => <UsersList
    sections={[{
      title: <Header>
        Friends
        <Header style={styles.headerCount}> {this.props.UserStore.currentUser.friends.length}</Header>
      </Header>,
      data: this.props.UserStore.currentUser.friends
    }]}
    style={styles.list}
    actions={this.actionsFriend}
  />
}

const styles = StyleSheet.create({
  list: {},
  container: {
    flex: 1
  },
  header: {
    backgroundColor: Colors.tintColor,
    padding: Layout.window.hp(1.5)
  },
  headerText: {
    color: '#fff'
  },
  headerCount: {
    color: '#b8b8b8cc'
  }
})
