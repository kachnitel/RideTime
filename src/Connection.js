/* global fetch, FormData */
import { getEnvVars } from '../constants/Env'
import AppError from './AppError'
import NetworkError from './NetworkError'
import Mime from 'mime/lite'
import applicationStore from '../stores/ApplicationStore.singleton'

export class Connection {
  baseUrl: String

  constructor (baseUrl: String) {
    this.baseUrl = baseUrl
  }

  get = (path) => {
    return this.#doRequest('GET', path)
  }

  delete = (path) => {
    return this.#doRequest('DELETE', path)
  }

  post = (path, data) => {
    return this.#doRequest('POST', path, JSON.stringify(data))
  }

  put = (path, data) => {
    return this.#doRequest('PUT', path, JSON.stringify(data))
  }

  /**
   * @param {string} path
   * @param {string} key
   * @param {object} file Result from Expo ImagePicker/ImageManipulator
   */
  postFile = (path, key, file) => {
    let uriParts = file.uri.split('.')
    let fileType = uriParts[uriParts.length - 1]

    let formData = new FormData()
    formData.append(key, {
      ...file,
      name: `photo.${fileType}`,
      type: Mime.getType(fileType)
    })

    return this.#doRequest('POST', path, formData, this.getApiHeaders({
      'Content-Type': 'multipart/form-data'
    }))
  }

  #doRequest = async (method: String, path: String, data = null, headers: ?Object = null) => {
    let url = this.baseUrl + '/' + path
    let requestHeaders = headers === null ? this.getApiHeaders() : headers

    console.log(method, url, data)

    try {
      var response = await fetch(url, {
        method: method,
        headers: requestHeaders,
        body: data
      })

      await this.validateResponse(response)

      // Return true if response contains no data
      // otherwise return data (async)
      let result = (response.status === 204 && !response.body)
        ? true
        : await response.json()
      return result
    } catch (error) {
      await this.handleError('Connection error', error, response)
    }
  }

  validateResponse = async (res) => {
    if (!res.ok) {
      let error = new NetworkError('Network error')
      error.setStatusCode(res.status)
      error.setBody(await res.json())

      this.#logError(error.body)
      throw error
    }
  }

  handleError = async (message, err, response) => {
    // Do not catch own error
    if (err instanceof NetworkError) {
      throw err
    }

    let error = new AppError(message)
    error.setData({
      error: JSON.stringify(err),
      response: response === null ? null : {
        status: response.status,
        body: response.body && await response.json()
      }
    })

    this.#logError(error.data)
    throw error
  }

  getApiHeaders = (override: Object = {}) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + applicationStore.accessToken
    }

    return { ...headers, ...override }
  }

  /**
   * Needed until an error handler is implemented
   */
  #logError = (data) => {
    console.warn('Connection error data', data)
  }
}

export default new Connection(getEnvVars().apiUrl)
