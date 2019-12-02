import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import AlternatingStyleList from '../lists/AlternatingStyleList'
import { observer } from 'mobx-react/native'
import RouteItem from '../list_items/RouteItem'
import TrailFilter from './TrailFilter'
import Layout from '../../constants/Layout'

export default
@observer
class SelectRoute extends Component {
  state = {
    routes: []
  }

  componentDidMount = () => {
    this.setState({
      routes: this.props.location.routes
    })
  }

  handleFilterUpdate = (filter) => {
    let routes = this.props.location.routes
    if (filter.difficulties.length > 0) {
      routes = routes.filter((trail) =>
        filter.difficulties.includes(trail.difficulty))
    }
    if (filter.search.length > 0) {
      routes = routes.filter((trail) =>
        trail.title.includes(filter.search.trim()))
    }
    this.setState({
      routes: routes
    })
  }

  routesList = () => <AlternatingStyleList
    items={this.state.routes}
    onItemPress={(route) => this.props.onSubmit(route)}
    itemComponent={(item, style) => <RouteItem route={item} style={style} />}
    windowSize={3}
    initialNumToRender={5}
  />

  render () {
    return (
      <View style={styles.container}>
        <TrailFilter
          style={styles.filter}
          onFilterUpdate={this.handleFilterUpdate}
        />
        {this.routesList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  filter: {
    width: '100%',
    padding: Layout.window.wp(5)
  }
})
