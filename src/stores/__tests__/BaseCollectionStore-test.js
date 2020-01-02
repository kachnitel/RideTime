import { BaseEntity } from '../BaseEntity'
import { BaseCollectionStore } from '../BaseCollectionStore'
import RidersProvider from '../../providers/RidersProvider'

/* eslint-env jest */
test('should return initialized entity', () => {
  let ent = new BaseEntity()
  ent.id = 666
  let store = new BaseCollectionStore(new RidersProvider(), BaseEntity)

  store.add(ent)

  expect(store.get(666)).toBe(ent)
})

// test('should throw a correct error message', () => {
//   let store = new BaseCollectionStore(new RidersProvider(), BaseEntity)

//   let ent = () => {
//     store.get(1)
//   }

//   expect(ent).toThrowError('Trying to get entity BaseEntity:1 before it is initialized')
// })

test('should fetch missing ids in list', () => {
  let { providerCalledIds, provider } = getMockListProvider()
  // Add entity with id = 1 manually
  let storedEntity = getBaseEntity(1)
  let store = new BaseCollectionStore(provider, BaseEntity)
  store.add(storedEntity)

  let requestIds = [1, 2, 3]
  store.list(requestIds)

  expect(providerCalledIds).toEqual([2, 3])
})

test('should fetch all ids in list', () => {
  let { providerCalledIds, provider } = getMockListProvider()
  // Add entity with id = 1 manually
  let storedEntity = getBaseEntity(1)
  let store = new BaseCollectionStore(provider, BaseEntity)
  store.add(storedEntity)

  let requestIds = [1, 2, 3]
  store.list(requestIds, true)

  expect(providerCalledIds).toEqual(requestIds)
})

/**
 * Mock a provider with list method
 * that returns entities with provided ids
 *
 * @returns {object} { providerCalledIds: [], provider: { list: function () } }
 */
const getMockListProvider = () => {
  let providerCalledIds = []
  let provider = {
    list: (ids: Array) => ids.map((id) => {
      let entity = getBaseEntity(id)
      providerCalledIds.push(id)

      return entity
    })
  }

  return {
    providerCalledIds: providerCalledIds,
    provider: provider
  }
}

const getBaseEntity = (id: Number) => {
  let entity = new BaseEntity()
  entity.id = id

  return entity
}
