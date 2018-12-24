import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RideTimeIcon from './icons/RideTimeIcon';

export default class RiderCount extends React.Component {
  render() {
    return(
      <View style={{...styles.container, ...this.props.style}} {...this.props}>
        <Text style={{
            ...styles.countIcon,
            ...this.props.fontStyle
        }}>
          {this.props.count || 0}
        </Text>
        <RideTimeIcon icon='person' size={this.props.size} style={styles.countIcon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  countIcon: {
    fontWeight: 'bold',
    paddingRight: 2,
    color: '#878787', //should be #656565 for black, 878787 white
    fontSize: 24
  },
  container: {
    flexDirection: 'row'
  }
})
