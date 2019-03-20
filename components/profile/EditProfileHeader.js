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
import { observer, inject } from 'mobx-react'

export default
@inject('User')
@observer
class EditProfileHeader extends React.Component {
  render () {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <CoverPicture
          user={this.props.User}
          style={headerStyles.coverPicture}
        />
        {/* TODO: Use EditPicture with repositioned icon (override icon style) */}
        <Icon name='edit' style={styles.editIcon} />
        <View style={headerStyles.businessCard}>
          <View style={headerStyles.profilePicture}>
            <EditPicture
              picture={this.props.User.picture}
              size={profilePictureSize}
              onSelect={(val) => this.props.User.updateTempPicture(val)}
            />
          </View>
          <View style={styles.form}>
            <TextInputWithTitle
              value={this.props.User.name}
              onChangeText={(val) => this.props.User.updateName(val)}
              placeholder='Your name'
              title='Name'
              containerStyle={styles.textInput}
            />
            <TextInputWithTitle
              value={this.props.User.hometown}
              onChangeText={(val) => this.props.User.updateHometown(val)}
              placeholder='Hometown, BC'
              title='Hometown'
              containerStyle={styles.textInput}
            />
            <SelectDifficulty
              value={this.props.User.level}
              onValueChange={(val) => this.props.User.updateLevel(val.value)}
              max={3}
              style={styles.textInput}
            />
            <SelectBike
              value={this.props.User.bike}
              onValueChange={(val) => this.props.User.updateBike(val.value)}
              style={styles.textInput}
            />
            <HomeLocationsPicker
              value={this.props.User.locations}
              onValueChange={(val) => this.props.User.updateLocations(val)}
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
