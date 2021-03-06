import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Layout from '../../../../constants/Layout'
import InputTitle from '../../form/InputTitle'
import ModalViewMenu from '../../modal/ModalViewMenu'
import DifficultyIcon from '../../icons/DifficultyIcon'
import OutlineIcon from '../../icons/OutlineIcon'
import Colors from '../../../../constants/Colors'
import SearchInput from '../../form/SearchInput'

export default class TrailFilter extends Component {
  state = {
    showMenu: false
  }

  updateFilter = (update) => {
    let filter = { ...this.props.filter, ...update }
    this.props.onFilterUpdate(filter)
  }

  showFilterMenu = () => this.setState({ showMenu: true })
  hideFilterMenu = () => this.setState({ showMenu: false })

  renderFilterTouchable = () => <TouchableOpacity onPress={this.showFilterMenu}>
    <View style={styles.filterTouchable}>
      <Text style={styles.filterText}>Tap to set filters</Text>
      <View style={styles.difficultiesPreview}>
        {this.props.filter.difficulty.map((d) => <OutlineIcon
          thickness={1.1}
          key={'d_' + d}
          outlineStyle={styles.outline}
        >
          <DifficultyIcon
            d={d}
            size={Layout.window.hp(2)}
          />
        </OutlineIcon>)}
      </View>
    </View>
  </TouchableOpacity>

  toggleDifficulty = (difficulty: Number) => {
    let selected = [...this.props.filter.difficulty]
    this.props.filter.difficulty.includes(difficulty)
      ? selected = selected.filter((d) => d !== difficulty)
      : selected.push(difficulty)

    this.updateFilter({ difficulty: selected })
  }

  renderFilterMenu = () => <ModalViewMenu
    isVisible={this.state.showMenu}
    onBackdropPress={this.hideFilterMenu}
    onBackButtonPress={this.hideFilterMenu}
    onClose={this.hideFilterMenu}
    options={Object.keys(DifficultyIcon.icons)
      .map(Number)
      .filter((d) => d > 0)
      .map((difficulty: Number) => ({
        onPress: () => this.toggleDifficulty(difficulty),
        customIcon: <DifficultyIcon d={difficulty} size={Layout.window.hp(5)} />,
        label: DifficultyIcon.icons[difficulty].label,
        icon: this.props.filter.difficulty.includes(difficulty)
          ? 'check'
          : this.props.filter.difficulty.length > 0
            ? 'clear'
            : 'check',
        highlight: this.props.filter.difficulty.includes(difficulty)
      }))
    }
  />

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <View style={styles.row}>
          <InputTitle>Filters: </InputTitle>
          {this.renderFilterTouchable()}
          {this.renderFilterMenu()}
        </View>
        <View style={styles.row}>
          <InputTitle>Search: </InputTitle>
          <SearchInput
            placeholder={'Search by name..'}
            onChangeText={(text) => this.updateFilter({ search: text.trim() })}
            style={styles.input}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: Layout.window.wp(55)
  },
  filterText: {
    width: Layout.window.wp(55),
    color: Colors.tabIconDefault,
    padding: Layout.window.hp(2)
  },
  filterTouchable: {
    flexDirection: 'row'
  },
  difficultiesPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.window.hp(1),
    borderRadius: Layout.window.hp(1)
  },
  outline: {
    color: Colors.secondaryText
  }
})
