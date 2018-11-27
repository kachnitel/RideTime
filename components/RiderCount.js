import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RideTimeIcon from './icons/RideTimeIcon';

export default class RiderCount extends React.Component {
  render() {
    return(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={[
          {
            fontSize: this.props.fontSize ? this.props.fontSize : 24,
            fontWeight: 'bold',
            paddingRight: 3
          },
          styles.countIcon
        ]}>
          {this.props.count ? this.props.count : 0}
        </Text>
        <RideTimeIcon icon='person' size={this.props.size} style={styles.countIcon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  countIcon: {
    color: '#878787' //should be #656565 for black, 878787 white
  }
})
