import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import AlternatingStyleList from '../../lists/AlternatingStyleList'
import RouteItem from './RouteItem'
import TrailFilter from './TrailFilter'
import Layout from '../../../../constants/Layout'

export default
@inject('RouteStore')
@observer
class SelectRoute extends Component {
  state = {
    filter: {
      difficulty: [],
      search: ''
    }
  }

  handleFilterUpdate = (filter) => {
    this.props.RouteStore.filter({ rid: this.props.location.id, ...filter })
    this.setState({
      filter: filter
    })
  }

  routesList = () => {
    let routes = this.props.location.routes
    if (this.state.filter.difficulty.length > 0) {
      routes = routes.filter((trail) =>
        this.state.filter.difficulty.includes(trail.difficulty))
    }
    if (this.state.filter.search.length > 0) {
      routes = routes.filter((trail) =>
        trail.title.includes(this.state.filter.search.trim()))
    }

    return <AlternatingStyleList
      items={routes}
      onItemPress={(route) => this.props.onSubmit(route)}
      itemComponent={(item, style) => <RouteItem route={item} style={style} />}
      windowSize={3}
      initialNumToRender={5}
    />
  }

  render () {
    return (
      <View style={styles.container}>
        <TrailFilter
          style={styles.filter}
          onFilterUpdate={this.handleFilterUpdate}
        />
        {this.props.location.routes.length > 0
          ? this.routesList()
          : <Text>No routes found in location.</Text>
        }
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
