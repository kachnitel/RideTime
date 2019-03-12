import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import CoverPicture from './CoverPicture'
import headerStyles, { profilePictureSize } from './ProfileHeaderStyle'
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
      <ScrollView keyboardShouldPersistTaps='handled'>
        <CoverPicture
          user={this.props.user}
          style={headerStyles.coverPicture}
        />
        {/* TODO: Use EditPicture with repositioned icon (override icon style) */}
        <Icon name='edit' style={styles.editIcon} />
        <View style={headerStyles.businessCard}>
          <View style={headerStyles.profilePicture}>
            <EditPicture
              picture={this.props.user.picture}
              size={profilePictureSize}
              onSelect={this.handleUpdatePicture}
            />
          </View>
          <View style={styles.form}>
            <TextInputWithTitle
              value={this.state.user.name}
              onChangeText={(val) => this.handleUpdate(val, 'name')}
              placeholder='Your name'
              title='Name'
              containerStyle={styles.textInput}
            />
            <TextInputWithTitle
              value={this.state.user.hometown}
              onChangeText={(val) => this.handleUpdate(val, 'hometown')}
              placeholder='Hometown, BC'
              title='Hometown'
              containerStyle={styles.textInput}
            />
            <SelectDifficulty
              value={this.state.user.level}
              onValueChange={(selected) => this.handleUpdate(selected.value, 'level')}
              max={3}
              style={styles.textInput}
            />
            <SelectBike
              value={this.state.user.favTerrain}
              onValueChange={(selected) => this.handleUpdate(selected.value, 'favTerrain')}
              style={styles.textInput}
            />
            <HomeLocationsPicker
              value={this.state.user.locations}
              onValueChange={(val) => this.handleUpdate(val, 'locations')}
              style={styles.textInput}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    margin: Layout.window.hp(1)
  },
  form: {
    paddingVertical: Layout.window.hp(2)
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
    right: 5,
    top: 5
  }
})
