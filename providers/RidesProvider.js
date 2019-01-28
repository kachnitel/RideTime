/* global fetch */
import { Constants } from 'expo'
import { Alert } from 'react-native'

const { manifest } = Constants
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:80`)
  : `api.example.com`

export const getRides = () => {
  let url = 'http://' + api + '/ridetime/?q=rides'
  console.log('Getting rides', url)
  return fetch(url)
    .then((res) => {
      return res.json()
    })
    .catch((error) => {
      Alert.alert('Network error')
      console.warn(error)
    })
}
