import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export default class LocationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {locations: props.data};
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      this.setState({locations: this.props.data});
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.locations}
          renderItem={({item}) => <View style={styles.location}><Text style={styles.item}>{item.id}</Text><Text style={styles.itemCoords}>{item.coords[0]}; {item.coords[1]}</Text></View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 2
    },
    item: {
      padding: 5,
      fontSize: 18,
      height: 32,
    },
    itemCoords: {
      paddingLeft: 5,
      fontSize: 10,
      height: 12,
    },
    location: {
      height: 44
    }
  })