import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import AlternatingStyleList from '../lists/AlternatingStyleList'
import { observer } from 'mobx-react/native'
import RouteItem from '../list_items/RouteItem'

export default
@observer
class SelectRoute extends Component {
  routesList = () => <AlternatingStyleList
    items={this.props.location.routes}
    onItemPress={(route) => this.props.onSubmit(route)}
    itemComponent={(item, style) => <RouteItem route={item} style={style} />}
    windowSize={3}
    initialNumToRender={5}
  />

  render () {
    return (
      <View style={styles.container}>
        {/* <Text>TODO: Filter</Text> */}
        {this.routesList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
