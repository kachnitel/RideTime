import UserStore, { User } from '../UserStore.mobx'
import RidersProvider from '../../providers/RidersProvider'
import applicationStore from '../ApplicationStore.singleton'

/* eslint-env jest */
test('should add user to store', async () => {
  let store = new UserStore(new RidersProvider(), User)
  let user = new User(store)

  user.updateId(1)
  user.updateName('Jenkins')

  store.add(user)

  expect(await store.get(1)).toBe(user)
})

test('should return correct API object', () => {
  let user = new User()

  user.updateId(2)
  user.updateName('Joe')
  user.updateBike('trail')
  user.updatePicture('http://pic.tu/re')

  expect(user.createApiJson()).toMatchObject({
    id: 2,
    name: 'Joe',
    bike: 'trail',
    picture: 'http://pic.tu/re'
  })

  expect(user.createApiJson(['picture', 'bike'])).toMatchObject({
    id: 2,
    name: 'Joe'
  })
})

test('should populate user from json', () => {
  let json = {
    id: 10,
    name: 'Joey'
  }
  let user = new User()
  user.populateFromApiResponse(json)
  expect(user.id).toBe(json.id)
  expect(user.name).toBe(json.name)
})

test('should move ID from requests to friends', () => {
  let store = new UserStore(new RidersProvider(), User)
  let user = new User(store)
  user.updateId(1)
  store.add(user)
  applicationStore.updateUserId(user.id)

  let friend = new User(store)
  friend.updateId(2)
  store.add(friend)

  store.addFriendRequest(2)

  expect(user.friends).toEqual([])
  expect(store.friendRequests).toEqual([friend.id])

  store.acceptFriendRequest(friend.id)

  expect(user.friends).toEqual([friend.id])
  expect(store.friendRequests).toEqual([])
})
