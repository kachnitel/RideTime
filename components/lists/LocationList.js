import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LocationItem from '../list_items/LocationItem';

export default class LocationList extends Component {
/*   constructor(props) {
    super(props);

    this.state = {locations: props.data};
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      this.setState({locations: this.props.data});
    }
  }
 */
  render() {
    return(
      <View style={styles.container}>
        <Text>Locations</Text>
        <FlatList
          data={this.props.locations}
          renderItem={({item}) =>
            <LocationItem location={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
  }
})
