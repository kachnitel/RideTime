/* global fetch, FormData */
import { getEnvVars } from '../constants/Env'
import AppError from './AppError'
import NetworkError from './NetworkError'
import Mime from 'mime/lite'
import applicationStore from '../stores/ApplicationStore.singleton'

const validateResponse = (res) => {
  if (!res.ok) {
    let error = new NetworkError('Network error')
    error.setStatusCode(res.status)
    error.setBody(res.json())
    throw error
  }
}

const handleError = (message, err) => {
  // Do not catch own error
  if (err instanceof NetworkError) {
    throw err
  }

  let error = new AppError(message)
  error.setData({ error: JSON.stringify(err) })

  throw error
}

export const get = (path) => {
  let url = getEnvVars().apiUrl + '/' + path

  console.log('GET', url)

  return fetch(url, {
    headers: getHeaders()
  })
    .then((res) => {
      validateResponse(res)
      return res.json()
    })
    .catch((error) => {
      handleError('Network request failed', error)
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
    headers: getHeaders(),
    body: dataJson
  })
    .then((res) => {
      validateResponse(res)
      return res.json()
    })
    .catch((error) => {
      handleError('Network error', error)
    })
}

export const post = (path, data) => {
  return submitData('POST', path, data)
}

export const put = (path, data) => {
  return submitData('PUT', path, data)
}

/**
 * TODO: Once working, refactor to use submitData
 * @param {string} path
 * @param {string} key
 * @param {object} file Result from Expo ImagePicker/ImageManipulator
 */
export const postFile = async (path, key, file) => {
  let url = getEnvVars().apiUrl + '/' + path

  console.log('POST', path, key, file)

  let uriParts = file.uri.split('.')
  let fileType = uriParts[uriParts.length - 1]

  let formData = new FormData()
  formData.append(key, {
    ...file,
    name: `photo.${fileType}`,
    type: Mime.getType(fileType)
  })
  let options = {
    method: 'POST',
    body: formData,
    headers: getHeaders('multipart/form-data')
  }

  let result = await fetch(url, options)
  return result.json()

  // return submitData(
  //   'POST',
  //   path,
  //   form,
  //   getHeaders('multipart/form-data')
  // )
}

export const getHeaders = (contentType = 'application/json') => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': contentType,
    'Authorization': 'Bearer ' + applicationStore.accessToken
  }

  return headers
}
