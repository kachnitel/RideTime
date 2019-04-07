import { Connection } from '../Connection'

/* eslint-env jest */

test('test correct headers are returned', () => {
  let conn = new Connection('http://api.example.com')

  expect(conn.getHeaders()).toEqual({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })

  expect(conn.getHeaders({
    'Accept': 'image/*',
    'Authentication': 'Bearer AsDf12QwEr34'
  })).toEqual({
    'Accept': 'image/*',
    'Content-Type': 'application/json',
    'Authentication': 'Bearer AsDf12QwEr34'
  })
})

test('test addHeaders', () => {
  let conn = new Connection('http://api.example.com')

  conn.addHeaders({
    'X-Test': '1234'
  })

  expect(conn.getHeaders()).toEqual({
    ...conn.headers,
    'X-Test': '1234'
  })
})
