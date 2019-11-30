import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import DifficultyRangeSlider from './DifficultyRangeSlider'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import InputTitle from '../form/InputTitle'
import FormTextInput from '../form/FormTextInput'

export default class TrailFilter extends Component {
  filter = {
    difficulties: [],
    search: ''
  }

  updateFilter = (update) => {
    this.filter = { ...this.filter, ...update }
    this.props.onFilterUpdate(this.filter)
  }

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <View style={styles.row}>
          <InputTitle>Difficulties: </InputTitle>
          <DifficultyRangeSlider
            width={Layout.window.wp(55)}
            onValuesChange={(values) => this.updateFilter({ difficulties: values })}
          />
        </View>
        <View style={styles.row}>
          <InputTitle>Search: </InputTitle>
          <FormTextInput
            placeholder={'Search by name..'}
            onChangeText={(text) => this.updateFilter({ search: text })}
            style={styles.input}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBackground
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    alignItems: 'center'
  },
  input: {
    width: Layout.window.wp(55)
  }
})
