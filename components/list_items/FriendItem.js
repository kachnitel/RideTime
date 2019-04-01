import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import Layout from '../../constants/Layout'
import { inject, observer } from 'mobx-react/native'
import { User } from '../../stores/UserStore.mobx'
import Header from '../Header'
import ProfilePictureDecorated from '../profile/ProfilePictureDecorated'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../constants/Colors'

export default
@inject('UserStore', 'ApplicationStore') @observer
class FriendItem extends React.Component {
  user: User
  state = {
    loading: true
  }

  async componentDidMount () {
    this.user = await this.props.UserStore.get(this.props.id)
    this.setState({ loading: false })
  }

  getActionButtons = () => {
    return <View style={styles.actions}>
      {this.getActions().map(({ icon, action }, index) => {
        return <TouchableOpacity onPress={() => action(this.props.id)} key={action + index} style={styles.actionButton}>
          <Icon name={icon} size={Layout.window.hp(3.5)} color='#fff' />
        </TouchableOpacity>
      })}
    </View>
  }

  getActions = () => {
    return this.props.actions || []
  }

  render () {
    return this.state.loading
      ? <ActivityIndicator style={{ ...styles.container, ...this.props.style }} />
      : <View style={{ ...styles.container, ...this.props.style }}>
        <ProfilePictureDecorated user={this.user} />
        <View style={styles.details}>
          <Header style={this.props.style} numberOfLines={1} >
            {this.user.name}
          </Header>
          <View>
            {/* {this.user.bike && <TerrainIcon terrain={this.user.bike} size={Layout.window.hp(4.5)} />} */}
          </View>
        </View>
        {this.getActionButtons()}
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Layout.window.hp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.window.wp(3)
  },
  details: {
    alignItems: 'flex-start',
    flex: 1,
    height: '100%',
    paddingLeft: Layout.window.wp(3)
  },
  actions: {},
  actionButton: {
    borderRadius: Layout.window.hp(0.75),
    padding: Layout.window.hp(0.75),
    margin: Layout.window.hp(0.25),
    backgroundColor: Colors.tintColor
  }
})
