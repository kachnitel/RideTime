/* eslint-env jest */
import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import RideItem from '../RideItem'
import UserStore from '../../../stores/UserStore.mobx'
import { Provider } from 'mobx-react/native'

jest.mock('../RideItemDetail', () => 'RideItemDetail')

let testRide = {
  'title': "Joey's Alice lake lap",
  'difficulty': 1,
  'location': 'Alice Lake',
  'locationGps': [49.775666, -123.123307],
  'members': [1],
  'terrain': 'trail',
  'route': 'Some trails'
}

it('renders correctly', () => {
  const tree = renderer.create(<Provider UserStore={new UserStore()}>
    <RideItem ride={testRide} />
  </Provider>).toJSON()

  expect(tree).toMatchSnapshot()
})

it('renders correctly with style', () => {
  const tree = renderer.create(<Provider UserStore={new UserStore()}>
    <RideItem
      ride={testRide}
      style={{
        backgroundColor: 'black',
        color: '#fff'
      }}
    />
  </Provider>).toJSON()

  expect(tree).toMatchSnapshot()
})
