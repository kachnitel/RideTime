import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RideTimeIcon from './icons/RideTimeIcon';

export default class RiderCount extends React.Component {
  render() {
    return(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{ // FIXME https://github.com/kachnitel/RideTime/commit/f4caf5f95245d182ec86d21bd5faf721197d3ef5#diff-61a4930816190520f9babe8250ecacd8
            fontSize: this.props.fontSize ? this.props.fontSize : 24,
            fontWeight: 'bold',
            paddingRight: 3,
            ...styles.countIcon
        }}>
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
