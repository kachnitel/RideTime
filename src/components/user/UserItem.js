import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { inject, observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import { User } from '../../stores/UserStore.mobx'
import Header from '../Header'
import ProfilePictureDecorated from '../profile/ProfilePictureDecorated'

export default
@inject('UserStore') @observer
class UserItem extends React.Component {
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
      {this.getActions().map(({ icon, action, disabled }, index) => {
        let d = false
        if (disabled !== undefined) {
          if (typeof disabled === 'boolean') {
            d = disabled
          } else if (typeof disabled === 'function') {
            d = disabled(this.props.id)
          } else {
            throw new Error('actions.disabled must be either bool or a function (' + typeof disabled + ')')
          }
        }

        let style = d
          ? { ...styles.actionButton, ...styles.actionButtonDisabled }
          : styles.actionButton
        return <TouchableOpacity
          onPress={() => action(this.props.id)}
          disabled={d}
          activeOpacity={d ? 0.5 : 1}
          key={action + index}
          style={style}
        >
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

UserItem.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    action: PropTypes.func,
    disabled: PropTypes.bool
  })),
  id: PropTypes.number.isRequired,
  style: PropTypes.any
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
  },
  actionButtonDisabled: {
    backgroundColor: '#6666'
  }
})
