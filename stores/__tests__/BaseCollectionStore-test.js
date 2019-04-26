import { BaseEntity } from '../BaseEntity'
import { BaseCollectionStore } from '../BaseCollectionStore'
import RidersProvider from '../../providers/RidersProvider'

/* eslint-env jest */
test('should return initialized entity', () => {
  let ent = new BaseEntity()
  ent.id = 666
  let store = new BaseCollectionStore(new RidersProvider(), BaseEntity)

  store.add(ent)

  expect(store.getSync(666)).toBe(ent)
})

test('should throw a correct error message', () => {
  let store = new BaseCollectionStore(new RidersProvider(), BaseEntity)

  let ent = () => {
    store.getSync(1)
  }

  expect(ent).toThrowError('Trying to get entity BaseEntity:1 before it is initialized')
})
