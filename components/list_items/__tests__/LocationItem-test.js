/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import LocationItem from '../LocationItem'
import locationStore from '../../../stores/LocationStore.singleton'
import { Location } from '../../../stores/LocationStore.mobx'

jest.mock('../../location/LocationDifficulties', () => 'LocationDifficulties')
jest.mock('../../RiderCount', () => 'RiderCount')

const mockMath = Object.create(global.Math)
mockMath.random = () => 0.5
global.Math = mockMath

it('renders correctly', async () => {
  let testLocation = {
    id: 1,
    name: 'Place',
    difficulties: [1, 2]
  }

  let location = new Location(locationStore)
  location.populateFromApiResponse(testLocation)
  locationStore.add(location)

  const component = renderer.create(
    <LocationItem.wrappedComponent
      locationId={location.id}
      LocationStore={locationStore}
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
  let instance = component.getInstance()
  await new Promise((resolve) => setTimeout(resolve, 10))
  expect(await instance.location).toBe(location)
  expect(component.toJSON()).toMatchSnapshot()
})
