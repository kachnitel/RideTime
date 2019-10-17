import EventStore, { Event } from '../EventStore.mobx'
import RidersProvider from '../../providers/RidersProvider'
import ApplicationStore from '../ApplicationStore.mobx'
import RidesProvider from '../../providers/RidesProvider'
import UserStore, { User } from '../UserStore.mobx'

/* eslint-env jest */
test('upsert should update existing event', () => {
  let userStore = new UserStore(new RidersProvider(), User, new ApplicationStore())
  let store = new EventStore(new RidesProvider(), Event, userStore)
  let event = new Event(store)
  event.updateId(1)

  let title = 'Updated title'
  store.add(event)
  store.upsertEvent({ id: 1, title: title })
  expect(event.title).toBe('Updated title')
})

test('upsert should create a new event', () => {
  let userStore = new UserStore(new RidersProvider(), User, new ApplicationStore())
  let store = new EventStore(new RidesProvider(), Event, userStore)

  store.upsertEvent({ id: 123, title: 'Test' })
  expect(store.list().length).toBe(1)
  let event = store.list()[0]
  expect(event).toBeInstanceOf(Event)
  expect(event.id).toBe(123)
})
