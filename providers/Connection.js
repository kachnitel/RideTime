/* global fetch */
import { Constants } from 'expo'
import { Alert } from 'react-native'
import UserStore from '../stores/UserStore.mobx'

const { manifest } = Constants
export const apiUrl = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:80`)
  : `apiUrl.example.com`

export const get = (path) => {
  // FIXME: move http:// and /ridetime/ to apiUrl
  let url = 'http://' + apiUrl + '/ridetime/' + path

  console.log('GET ', url)

  return fetch(url, {
    headers: getHeaders(UserStore.accessToken)
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Network response was not "ok".')
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export const post = (path, data) => {
  let url = 'http://' + apiUrl + '/ridetime/' + path
  let dataJson = JSON.stringify(data)

  console.log('POST ', url, dataJson)

  return fetch(url, {
    method: 'POST',
    headers: getHeaders(UserStore.accessToken),
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

export const getHeaders = (authToken) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authToken
  }
}
