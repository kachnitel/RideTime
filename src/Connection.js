/* global fetch, FormData */
import AppError from './AppError'
import NetworkError from './NetworkError'
import Mime from 'mime/lite'
import qs from 'qs'

export class Connection {
  baseUrl: String
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  constructor (baseUrl: String) {
    this.baseUrl = baseUrl
  }

  get = (path, params) => {
    if (params) {
      path += '?' + qs.stringify(params)
    }
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

    return this.#doRequest('POST', path, formData, this.getHeaders({
      'Content-Type': 'multipart/form-data'
    }))
  }

  #doRequest = async (method: String, path: String, data = null, headers: ?Object = null) => {
    let url = this.baseUrl + '/' + path
    let requestHeaders = headers === null ? this.getHeaders() : headers

    let logHeaders = JSON.stringify(
      requestHeaders,
      (key, val) => key === 'Authorization' ? val.slice(0, 10) + '...' : val
    )
    console.log(method, url, data, logHeaders)

    try {
      var response = await fetch(url, {
        method: method,
        headers: requestHeaders,
        body: data
      })

      await this.validateResponse(response)

      // Return true if response contains no data
      // otherwise return data (async)
      var result = (response.status === 204 && !response.body)
        ? true
        : await response.json()
      return result
    } catch (error) {
      this.handleError(
        'Connection error',
        error,
        response?.status,
        result
      )
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

  handleError = (message, err, status, result) => {
    // Do not catch own error
    if (err instanceof NetworkError) {
      throw err
    }

    let error = new AppError(message)
    error.setData({
      error: JSON.stringify(err),
      response: {
        status: status,
        body: result
      }
    })

    this.#logError(error.data)
    throw error
  }

  /**
   * @param {Object} [override={}] Object of headers to merge/overwrite defaults
   * @returns
   * @memberof Connection
   */
  getHeaders (override: Object = {}) {
    return { ...this.headers, ...override }
  }

  /**
   * Set headers for all requests
   *
   * @param {Object} headers
   * @memberof Connection
   */
  addHeaders (headers: Object) {
    this.headers = { ...this.headers, ...headers }
  }

  /**
   * Needed until an error handler is implemented
   */
  #logError = (data) => {
    console.warn('Connection error data', data)
  }
}
