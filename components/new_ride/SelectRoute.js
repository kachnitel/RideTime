import React, { Component } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AlternatingStyleList from '../lists/AlternatingStyleList'
import { observer } from 'mobx-react/native'
import RouteItem from '../list_items/RouteItem'

export default
@observer
class SelectRoute extends Component {
  routesList = () => <ScrollView>
    <AlternatingStyleList
      items={this.props.location.routes}
      onItemPress={(route) => this.props.onSubmit(route)}
      itemComponent={(item, style) => <RouteItem route={item} style={style} />}
      windowSize={6}
      initialNumToRender={6}
    />
  </ScrollView>

  render () {
    return (
      <View>
        {/* <Text>TODO: Filter</Text> */}
        <View>
          {this.routesList()}
        </View>
      </View>
    )
  }
}
