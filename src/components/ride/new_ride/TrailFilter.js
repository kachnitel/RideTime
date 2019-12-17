import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import DifficultyRangeSlider from './DifficultyRangeSlider'
import Colors from '../../../../constants/Colors'
import Layout from '../../../../constants/Layout'
import InputTitle from '../../form/InputTitle'
import TextInputWithTitle from '../../form/TextInputWithTitle'

export default class TrailFilter extends Component {
  filter = {
    difficulty: [],
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
            onValuesChange={(values) => this.updateFilter({ difficulty: values })}
          />
        </View>
        <TextInputWithTitle
          title='Search:'
          placeholder={'Search by name..'}
          onChangeText={(text) => this.updateFilter({ search: text.trim() })}
          style={styles.input}
          containerStyle={styles.row}
        />
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
    alignItems: 'center'
  },
  input: {
    width: Layout.window.wp(55)
  }
})
