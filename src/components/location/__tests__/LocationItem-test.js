/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import LocationItem from '../LocationItem'
import LocationStore, { Location } from '../../../stores/LocationStore.mobx'
import LocationsProvider from '../../../providers/LocationsProvider'

jest.mock('../LocationDifficulties', () => 'LocationDifficulties')
jest.mock('../../ride/RiderCount', () => 'RiderCount')

it('renders correctly', async () => {
  let testLocation = {
    id: 1,
    name: 'Place',
    difficulties: [1, 2]
  }

  let locationStore = new LocationStore(new LocationsProvider(), {})

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
  await new Promise(resolve => process.nextTick(resolve))
  expect(instance.location).toBe(location)
  expect(component.toJSON()).toMatchSnapshot()
})
