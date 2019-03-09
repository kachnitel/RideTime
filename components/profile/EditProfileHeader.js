import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import CoverPicture from './CoverPicture'
import styles, { profilePictureSize } from './ProfileHeaderStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../../constants/Layout'
import EditPicture from './EditPicture'
import SelectDifficulty from '../sign_up/SelectDifficulty'
import SelectBike from '../sign_up/SelectBike'
import TextInputWithTitle from '../form/TextInputWithTitle'
import HomeLocationsPicker from '../sign_up/HomeLocationsPicker'

export default class EditProfileHeader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.user
    }
  }

  handleUpdateName = (val) => {
    this.handleUpdate(val, 'name')
  }

  handleUpdateCity = (val) => {
    this.handleUpdate(val, 'hometown')
  }

  handleUpdateLevel = (selected) => {
    this.handleUpdate(selected.value, 'level')
  }

  handleUpdateBike = (selected) => {
    this.handleUpdate(selected.value, 'favTerrain')
  }

  handleUpdatePicture = (val) => {
    this.props.updatePictureCallback(val)
  }

  handleUpdateLocations = (val) => {
    this.handleUpdate(val, 'locations')
  }

  handleUpdate = async (val, key) => {
    await this.setState(
      (prevState) => ({ user: { ...prevState.user, [key]: val } })
    )
    this.props.updateCallback(this.state.user)
  }

  render () {
    return (
      <ScrollView>
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
        <View style={{ ...styles.businessCard, ...editStyles.businessCard }}>
          <View style={styles.profilePicture}>
            <EditPicture
              picture={this.props.user.picture}
              size={profilePictureSize}
              onSelect={this.handleUpdatePicture}
            />
          </View>
          <View style={editStyles.form}>
            <TextInputWithTitle
              value={this.state.user.name}
              onChangeText={this.handleUpdateName}
              placeholder='Your name'
              title='Name'
              containerStyle={editStyles.textInput}
            />
            <TextInputWithTitle
              value={this.state.user.hometown}
              onChangeText={this.handleUpdateCity}
              placeholder='Hometown, BC'
              title='Hometown'
              containerStyle={editStyles.textInput}
            />
            <SelectDifficulty
              value={this.state.user.level}
              onValueChange={this.handleUpdateLevel}
              max={3}
              style={editStyles.textInput}
            />
            <SelectBike
              value={this.state.user.favTerrain}
              onValueChange={this.handleUpdateBike}
              style={editStyles.textInput}
            />
            <HomeLocationsPicker
              onValueChange={this.handleUpdateLocations}
              style={editStyles.textInput}
              // value={this.state.user.locations} // TODO: preselect existing
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const editStyles = StyleSheet.create({
  textInput: {
    margin: Layout.window.hp(1)
  },
  form: {
    paddingVertical: Layout.window.hp(2)
  },
  businessCard: {
    height: Layout.window.hp(100),
    alignItems: 'center'
  },
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
