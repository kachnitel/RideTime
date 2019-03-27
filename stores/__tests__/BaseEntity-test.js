import { BaseEntity } from '../BaseEntity'

/* eslint-env jest */
test('should create snapshot', () => {
  let ent = new BaseEntity()
  ent.API_PARAMS = ['id', 'name']
  ent.id = 1
  ent.name = 'Joe Testonson'

  expect(JSON.stringify(ent.createApiJson())).toBe(JSON.stringify({
    id: ent.id,
    name: ent.name
  }))

  expect(JSON.stringify(ent.createApiJson(['id']))).toBe(JSON.stringify({
    name: ent.name
  }))
})
