/* eslint-env jest */
import React from 'react'
import 'react-native'
import renderer from 'react-test-renderer'
import LocationItem from '../LocationItem'
// import { View } from 'react-native'

jest.mock('../../location/LocationDifficulties', function () { return 'LocationDifficulties' })

it('renders correctly', () => {
  let testLocation = {
    name: 'Place',
    difficulties: [1, 2]
  }

  const tree = renderer.create(<LocationItem location={testLocation} />).toJSON()

  expect(tree).toMatchSnapshot()
})
