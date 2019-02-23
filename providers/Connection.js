/* global fetch */
import { Alert } from 'react-native'
import ApplicationStore from '../stores/ApplicationStore.mobx'
import { getEnvVars } from '../constants/Env'

const handleErrorResponse = (res) => {
  console.log('RES', res)
  throw new Error('Network response was not "ok".')
}

const handleError = (error) => {
  Alert.alert('Network error')
  throw new Error(error)
}

export const get = (path) => {
  let url = getEnvVars().apiUrl + '/' + path

  console.log('GET', url)

  return fetch(url, {
    headers: getHeaders(ApplicationStore.accessToken)
  })
    .then((res) => {
      if (!res.ok) {
        handleErrorResponse(res)
      }
      return res.json()
    })
    .catch((error) => {
      handleError(error)
    })
}

/**
 * @param {string} method POST|PUT
 * @param {string} path
 * @param {*} data JSON serializable data
 */
const submitData = (method, path, data) => {
  let url = getEnvVars().apiUrl + '/' + path
  let dataJson = JSON.stringify(data)

  console.log(method, url, dataJson)

  return fetch(url, {
    method: method,
    headers: getHeaders(ApplicationStore.accessToken),
    body: dataJson
  })
    .then((res) => {
      if (!res.ok) {
        handleErrorResponse(res)
      }
      return res.json()
    })
    .catch((error) => {
      handleError(error)
    })
}

export const post = (path, data) => {
  return submitData('POST', path, data)
}

export const put = (path, data) => {
  return submitData('PUT', path, data)
}

export const getHeaders = (authToken) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authToken
  }
}
