import React from 'react';
import { StyleSheet } from 'react-native';

/* 
 * Provide common style (TODO and functionality)
 * to keep list items consistent 
 */
export class ListItem extends React.Component {
  // todo "interface" getItemLink
  // <TouchableHighlight onPress=this.getItemLink()}>
  //   <View>...Item Stuff...</View>

  getStyles() {
    return styles;
  }
}

const styles = StyleSheet.create({
  name: {
    padding: 3,
    fontSize: 20,
    height: 32,
    fontWeight: 'bold'
  },
  listItem: {
    height: 120,
    padding: 15
  }
})
