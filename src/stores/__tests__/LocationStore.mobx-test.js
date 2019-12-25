import LocationStore, { Location } from '../LocationStore.mobx'
import EventStore, { Event } from '../EventStore.mobx'

/* eslint-env jest */
test('Location.events shold return events in location', () => {
  let stores = {
    event: null,
    location: null
  }
  stores.event = new EventStore(null, stores)
  stores.location = new LocationStore(null, stores)
  let location = new Location(stores.location)
  location.updateId(1)
  let event = new Event(stores.event)
  event.updateLocation(location.id)
  stores.event.add(event)
  stores.event.add(new Event(stores.event)) // random event in different location

  expect(location.events.length).toBe(1)
  expect(location.events[0]).toBe(event)
})
