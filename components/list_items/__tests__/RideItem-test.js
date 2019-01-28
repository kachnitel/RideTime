/* eslint-env jest */
import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import RideItem from '../RideItem'

jest.mock('../../RideItemDetail', () => 'RideItemDetail')

let testRide = {
  'name': "Joey's Alice lake lap",
  'difficulty': 1,
  'location': 'Alice Lake',
  'locationGps': [49.775666, -123.123307],
  'members': [1],
  'terrain': 'trail',
  'route': 'Some trails'
}

it('renders correctly', () => {
  const tree = renderer.create(<RideItem ride={testRide} />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('renders correctly with style', () => {
  const tree = renderer.create(<RideItem
    ride={testRide}
    style={{
      backgroundColor: 'black',
      color: '#fff'
    }}
  />).toJSON()

  expect(tree).toMatchSnapshot()
})
