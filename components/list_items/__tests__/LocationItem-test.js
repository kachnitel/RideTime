/* eslint-env jest */
import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import LocationItem from '../LocationItem'

jest.mock('../../location/LocationDifficulties', () => 'LocationDifficulties')

it('renders correctly', () => {
  let testLocation = {
    name: 'Place',
    difficulties: [1, 2]
  }

  const tree = renderer.create(<LocationItem location={testLocation} />).toJSON()

  expect(tree).toMatchSnapshot()
})
