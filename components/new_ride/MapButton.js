import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import Layout from '../../constants/Layout';

export default class MapButton extends React.Component {
  render() {
    styles = stylesWProps(this.props);
    return(
      <TouchableHighlight
        onPress={() => {console.log('Map time!')}}
        style={{...this.props.style, ...styles.mapButton}}
      >
        <Text style={styles.mapButtonText}>🔎</Text>
      </TouchableHighlight>
    );
  }
}

const stylesWProps = (props) => StyleSheet.create({
  mapButton: {
    height: props.size,
    width: props.size,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F00',
    borderWidth: 1,
    marginLeft: 'auto',
  },
  mapButtonText: {
    fontSize: Layout.window.hp(7)
  }
})
