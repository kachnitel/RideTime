import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AlternatingStyleList from '../lists/AlternatingStyleList'
import { observer } from 'mobx-react/native'

export default
@observer
class SelectRoute extends Component {
  routesList = () => <ScrollView>
    <AlternatingStyleList
      items={this.props.location.routes}
      onItemPress={(item) => console.log(item)}
      itemComponent={(item, style) => <Text>{item.title}</Text>}
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
