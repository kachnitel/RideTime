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
      onItemPress={(item) => console.log(item)}
      itemComponent={(item, style) => <RouteItem route={item} style={style} />}
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
