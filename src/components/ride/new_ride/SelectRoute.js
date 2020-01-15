import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import StyledSectionList from '../../lists/StyledSectionList'
import RouteItem from './RouteItem'

export default
@inject('RouteStore')
@observer
class SelectRoute extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    if (JSON.stringify(prevProps.filter) !== JSON.stringify(this.props.filter)) {
      this.refresh()
    }
  }

  refresh = () =>
    this.props.RouteStore.filter({ rid: this.props.location.id, ...this.props.filter })

  routesList = () => {
    let routes = this.props.location.routes
    if (this.props.filter.difficulty.length > 0) {
      routes = routes.filter((trail) =>
        this.props.filter.difficulty.includes(trail.difficulty))
    }
    if (this.props.filter.search.length > 0) {
      routes = routes.filter((trail) =>
        trail.title.includes(this.props.filter.search.trim()))
    }

    return <StyledSectionList
      sections={[{ title: 'Routes', data: routes }]}
      onItemPress={(route) => this.props.onSubmit(route)}
      itemComponent={(item) => <RouteItem route={item} />}
      windowSize={3}
      initialNumToRender={5}
    />
  }

  render () {
    return (
      <View style={styles.container}>
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
  }
})
