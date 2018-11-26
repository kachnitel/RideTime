import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RideTimeIcon from './icons/RideTimeIcon';

export default class RiderCount extends React.Component {
  render() {
    return(
      <View {...this.props} style={[this.props.style, {flex: 1, flexDirection: 'row', paddingTop: 10}]}>
        <Text style={[
          styles.countIcon, 
          {
            fontSize: this.props.fontSize ? this.props.fontSize : 24,
            fontWeight: 'bold',
            paddingRight: 3
          }
        ]}>
          {this.props.count ? this.props.count : 0}
        </Text>
        <RideTimeIcon icon='person' {...this.props} style={styles.countIcon} />
      </View>
    );
  }
}

styles = StyleSheet.create({
  countIcon: {
    color: '#878787', //should be #656565 for black, 878787 white
  }
})
