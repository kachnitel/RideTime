import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import DifficultyIcon from '../../icons/DifficultyIcon'
import OutlineDifficultyIcon from '../../icons/OutlineDifficultyIcon'
import Colors from '../../../../constants/Colors'

/**
 * TODO: On tapping an icon it should select just that one (incl. markers?)
 */
export default class DifficultyRangeSlider extends Component {
  constructor (props) {
    super(props)

    this.difficulties = Object.keys(DifficultyIcon.icons).map(Number)
    this.min = Math.min(...this.difficulties)
    this.max = Math.max(...this.difficulties)
    this.touchSize = this.props.width / this.difficulties.length
    this.iconSize = this.touchSize * 0.7
    this.state = {
      selectedMin: this.min,
      selectedMax: this.max
    }
    this.sliderTimeoutId = null
  }

  handleValuesChange = async (values) => {
    await this.setState({
      selectedMin: values[0],
      selectedMax: values[1]
    })
    clearTimeout(this.sliderTimeoutId)
    this.sliderTimeoutId = setTimeout(() => {
      this.props.onValuesChange(this.difficulties.filter(this.isSelected))
    }, 100)
  }

  sliderBackgroundIcon = (difficulty: Number) => <OutlineDifficultyIcon
    difficulty={difficulty}
    size={this.iconSize}
    key={'d' + difficulty}
    outlineColor={this.isSelected(difficulty)
      ? Colors.iconColor
      : Colors.darkBackground
    }
    thickness={1.15}
  />

  isSelected = (difficulty) => (
    difficulty >= this.state.selectedMin &&
    difficulty <= this.state.selectedMax
  )

  renderIcons = () => <View
    style={{
      ...styles.iconsRow,
      width: this.props.width,
      height: this.touchSize,
      marginBottom: -this.touchSize
    }}
    pointerEvents={'none'}
  >
    {Object.keys(DifficultyIcon.icons).map(Number).map((difficulty) =>
      this.sliderBackgroundIcon(difficulty)
    )}
  </View>

  renderMarker = (difficulty: Number) => <OutlineDifficultyIcon
    difficulty={difficulty}
    size={this.iconSize}
    thickness={1.15}
    outlineColor={Colors.iconColor}
  />

  render () {
    return (
      <View style={{
        ...styles.container,
        height: this.touchSize
      }}>
        {this.renderIcons()}
        <MultiSlider
          optionsArray={this.difficulties}
          step={1}
          snapped
          allowOverlap
          onValuesChange={this.handleValuesChange}
          values={this.props.single
            ? [this.state.selectedMin]
            : [this.state.selectedMin, this.state.selectedMax]}
          isMarkersSeparated
          customMarkerLeft={(e) => this.renderMarker(e.currentValue)}
          customMarkerRight={(e) => this.renderMarker(e.currentValue)}
          trackStyle={styles.track}
          selectedStyle={styles.selectedTrack}
          containerStyle={{ height: this.touchSize }}
          sliderLength={this.props.width - this.touchSize * 0.8} // FIXME: Where does the * 0.8 come from?!
          touchDimensions={{
            height: this.touchSize,
            width: this.touchSize,
            borderRadius: this.touchSize / 3,
            slipDisplacement: this.touchSize * 4
          }}
        />
      </View>
    )
  }
}

DifficultyRangeSlider.propTypes = {
  single: PropTypes.bool,
  width: PropTypes.number.isRequired,
  onValuesChange: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: -1
  },
  track: {
    zIndex: -100
  },
  selectedTrack: {
    backgroundColor: Colors.tintColor
  }
})
