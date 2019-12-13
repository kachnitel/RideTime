import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Text, View, StyleSheet } from 'react-native'
import { CustomPicker } from 'react-native-custom-picker'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import InputTitle from './InputTitle'

export default class SelectWithIcon extends React.Component {
  render () {
    return (
      <View {...this.props}>
        <InputTitle>{this.props.title}</InputTitle>
        <CustomPicker
          placeholder={this.props.placeholder}
          options={this.props.options}
          getLabel={item => item.label}
          fieldTemplate={this.renderField}
          optionTemplate={this.renderOption}
          headerTemplate={this.renderHeader}
          footerTemplate={this.renderFooter}
          onValueChange={this.props.onValueChange || ((value) => Alert.alert(value.value + ' selected'))}
          value={this.props.value}
        />
      </View>
    )
  }

  renderField = ({ selectedItem, defaultText, getLabel }) => {
    return (
      <View style={{
        ...styles.container,
        borderBottomColor: this.props.required && !this.props.value
          ? 'red'
          : Colors.tintColor
      }}>
        {selectedItem
          ? <View style={styles.innerContainer}>
            {this.props.icon(selectedItem.value)}
            <Text style={styles.text}>
              {getLabel(selectedItem)}
            </Text>
          </View>
          : <Text style={{ ...styles.text, ...styles.placeholderText }}>{defaultText}</Text>}
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerText}>{this.props.headerText}</Text>
      </View>
    )
  }

  renderFooter = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.footerText}>{this.props.footerText}</Text>
      </View>
    )
  }

  renderOption = ({ item, getLabel }) => {
    return (
      <View style={styles.optionContainer}>
        {this.props.icon(item.value)}
        <Text style={styles.optionLabel}>{getLabel(item)}</Text>
      </View>
    )
  }
}

SelectWithIcon.propTypes = {
  footerText: PropTypes.string,
  headerText: PropTypes.string,
  icon: PropTypes.any,
  onValueChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string
  })),
  placeholder: PropTypes.string,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: Layout.window.wp(1),
    width: Layout.window.wp(65),
    backgroundColor: 'rgba(255,255,255,0.03);'
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
  }
})