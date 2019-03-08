import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'
import ProfilePicture from './ProfilePicture'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../../constants/Layout'
import { ImagePicker, ImageManipulator } from 'expo'

export default class EditPicture extends React.Component {
  /**
   * Calls onSelect with @param Object { uri, width, height }
   *
   * @memberof EditPicture
   */
  _selectPicture = async () => {
    let picture = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })

    if (picture.cancelled) {
      return
    }
    if (picture.height < 300) {
      Alert.alert(`Sorry! That picture is too small! Minimum size is 300x300 px`)
      return
    }
    if (picture.height > 900) {
      console.log('Picture is too large! Resizing...', picture)
      picture = await ImageManipulator.manipulateAsync(
        picture.uri,
        [
          { resize: { width: 900, height: 900 } }
        ],
        {
          compress: 0.4,
          format: 'png'
        }
      )
    }

    this.props.onSelect(picture)
  }

  render () {
    return (
      <TouchableOpacity onPress={this._selectPicture}>
        <View style={this.props.style} >
          <ProfilePicture picture={this.props.picture} size={this.props.size} />
          <Icon
            name='edit'
            style={{
              ...styles.editIcon,
              fontSize: this.props.iconSize || this.props.size * 0.25
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

EditPicture.propTypes = {
  iconSize: PropTypes.number,
  onSelect: PropTypes.func,
  picture: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.any
}

const styles = StyleSheet.create({
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
    bottom: 5
  }
})
