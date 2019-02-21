/* global fetch */
import { Alert } from 'react-native'
import UserStore from '../stores/UserStore.mobx'
import { getEnvVars } from '../constants/Env'

export const get = (path) => {
  let url = getEnvVars().apiUrl + '/' + path

  console.log('GET', url)

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
  let url = getEnvVars().apiUrl + '/' + path
  let dataJson = JSON.stringify(data)

  console.log('POST', url, dataJson)

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
      throw new Error(error)
    })
}

export const getHeaders = (authToken) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authToken
  }
}
