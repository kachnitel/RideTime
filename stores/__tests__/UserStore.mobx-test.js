import UserStore, { User } from '../UserStore.mobx'

/* eslint-env jest */
test('should add user to store', async () => {
  let store = new UserStore()
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
    favTerrain: 'trail',
    picture: 'http://pic.tu/re'
  })

  expect(user.createApiJson(['picture', 'favTerrain'])).toMatchObject({
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
