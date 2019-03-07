import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import CoverPicture from './CoverPicture'
import ProfileSummary from './ProfileSummary'
import styles, { profilePictureSize } from './ProfileHeaderStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../../constants/Layout'
import EditPicture from './EditPicture'

export default class EditProfileHeader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.user
    }
  }

  // FIXME: the TextInput should be a component
  handleUpdateName = (val) => {
    this.handleUpdate(val, 'name')
  }

  handleUpdateCity = (val) => {
    this.handleUpdate(val, 'hometown')
  }

  handleUpdatePicture = (val) => {
    this.props.updatePictureCallback(val)
  }

  handleUpdate = async (val, key) => {
    await this.setState(
      (prevState) => ({ user: { ...prevState.user, [key]: val } })
    )
    this.props.updateCallback(this.state.user)
  }

  render () {
    return (
      <View>
        <CoverPicture
          user={this.props.user}
          style={styles.coverPicture}
        />
        {/* TODO: Use EditPicture with repositioned icon (override icon style) */}
        <Icon
          name='edit'
          style={{
            ...editStyles.editIcon, ...editStyles.editIconCoverPicture
          }}
        />
        <View style={styles.businessCard}>
          <EditPicture
            picture={this.props.user.picture}
            size={profilePictureSize}
            onSelect={this.handleUpdatePicture}
          />
          <TextInput
            style={styles.name}
            underlineColorAndroid='white'
            textAlign={'center'}
            value={this.state.user.name}
            onChangeText={this.handleUpdateName}
            placeholder='Your name'
            placeholderTextColor='gray'
          />
          <TextInput
            style={styles.hometown}
            underlineColorAndroid='white'
            textAlign={'center'}
            value={this.state.user.hometown}
            onChangeText={this.handleUpdateCity}
            placeholder='Hometown, BC'
            placeholderTextColor='gray'
          />
          <ProfileSummary style={styles.profileSummary} user={this.props.user} />
        </View>
      </View>
    )
  }
}

const editStyles = StyleSheet.create({
  editIcon: {
    fontSize: Layout.window.hp(5),
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: Layout.window.hp(0.75),
    textShadowColor: 'rgba(0,0,0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.75);',
    right: 5
  },
  editIconCoverPicture: {
    top: 5
  }
})
