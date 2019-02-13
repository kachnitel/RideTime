/* global fetch */
import { Constants } from 'expo'
import { Alert } from 'react-native'

const { manifest } = Constants
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:80`)
  : `api.example.com`

export const get = (path, apiToken) => {
  let url = 'http://' + api + '/ridetime/' + path

  console.log('GET ', url)

  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiToken
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Network response was not "ok".')
    })
    .catch((error) => {
      Alert.alert('Network error')
      console.warn(error)
    })
}

export const post = (path, apiToken, data) => {
  let url = 'http://' + api + '/ridetime/' + path
  let dataJson = JSON.stringify(data)

  console.log('POST ', url, dataJson)

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiToken
    },
    body: dataJson
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      console.log('RES', res)
      throw new Error('Network response was not "ok".')
    })
    .catch((error) => {
      Alert.alert('Network error')
      // console.log(error)
      console.warn(error)
    })
}
