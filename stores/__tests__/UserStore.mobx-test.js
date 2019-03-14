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
