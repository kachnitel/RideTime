import React from 'react'
import { Alert, Text, View, StyleSheet } from 'react-native'
import { CustomPicker } from 'react-native-custom-picker'
import DifficultyIcon from '../icons/DifficultyIcon'
import OutlineIcon from '../icons/OutlineIcon'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import InputTitle from './InputTitle'

export default class SelectDifficulty extends React.Component {
  render () {
    const options = Object.keys(DifficultyIcon.icons).map((value, index) => {
      return ({
        value: index,
        ...DifficultyIcon.icons[index]
      })
    }).filter((level) => this.props.max === undefined ? true : level.value <= this.props.max)

    return (
      <View {...this.props}>
        <InputTitle>Riding experience</InputTitle>
        <CustomPicker
          placeholder={'What\' s your riding experience?'}
          options={options}
          getLabel={item => item.label}
          fieldTemplate={this.renderField}
          optionTemplate={this.renderOption}
          headerTemplate={this.renderHeader}
          footerTemplate={this.renderFooter}
          onValueChange={this.props.onValueChange || ((value) => Alert.alert(value.value + ' selected'))}
        />
      </View>
    )
  }

  renderHeader () {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerText}>Select trail difficulty</Text>
      </View>
    )
  }

  renderField (settings) {
    const { selectedItem, defaultText, getLabel } = settings
    return (
      <View style={styles.container}>
        {selectedItem
          ? <View style={styles.innerContainer}>
            <OutlineIcon outlineStyle={styles.iconOutline}>
              <DifficultyIcon d={selectedItem.value} size={Layout.window.hp(6)} />
            </OutlineIcon>
            <Text style={styles.text}>
              {getLabel(selectedItem)}
            </Text>
          </View>
          : <Text style={{ ...styles.text, ...styles.placeholderText }}>{defaultText}</Text>}
      </View>
    )
  }

  renderFooter () {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.footerText}>
          Choose difficulty you're generally comfortable riding. It will be displayed on yor profile.
        </Text>
      </View>
    )
  }

  renderOption (settings) {
    const { item, getLabel } = settings
    return (
      <View style={styles.optionContainer}>
        <DifficultyIcon d={item.value} size={Layout.window.hp(6)} />
        <Text style={styles.optionLabel}>{getLabel(item)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1,
    padding: Layout.window.wp(1.5),
    width: Layout.window.wp(65)
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  text: {
    fontSize: Layout.window.hp(2.5),
    color: '#fff',
    textAlignVertical: 'center',
    paddingHorizontal: Layout.window.wp(5),
    height: Layout.window.hp(7)
  },
  placeholderText: {
    color: '#666',
    paddingHorizontal: Layout.window.wp(1.5)
  },
  headerFooterContainer: {
    padding: Layout.window.wp(3),
    alignItems: 'center'
  },
  headerText: {
    fontSize: Layout.window.hp(3)
  },
  footerText: {
    textAlign: 'center'
  },
  optionContainer: {
    flexDirection: 'row',
    padding: Layout.window.hp(1),
    borderBottomColor: Colors.darkBackground,
    borderBottomWidth: 1
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  optionLabel: {
    textAlignVertical: 'center',
    fontSize: Layout.window.hp(2.75),
    paddingHorizontal: Layout.window.wp(5)
  },
  iconOutline: {
    color: '#fff'
  }
})
