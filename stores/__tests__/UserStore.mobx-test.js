import UserStore, { User } from '../UserStore.mobx'
import RidersProvider from '../../providers/RidersProvider'

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

test('should return other party in friendship', () => {
  let store = new UserStore(new RidersProvider(), User)
  let user = new User(store)
  user.updateId(1)
  store.add(user)

  let friendA = new User(store)
  friendA.updateId(2)
  store.add(friendA)

  let friendB = new User(store)
  friendB.updateId(3)
  store.add(friendB)

  user.addFriend(friendA)
  friendB.addFriend(user)

  expect(user.friends).toEqual([])
  // accept!
  expect(user.friends).toEqual([2, 3])
  expect(friendA.friends).toEqual([1])
  expect(friendB.friends).toEqual([1])
})
