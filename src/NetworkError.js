import AppError from './AppError'

class NetworkError extends AppError {
  constructor (params) {
    super(params)

    this.statusCode = null
    this.body = null
  }

  setStatusCode (code) {
    this.statusCode = code
  }

  setBody (body) {
    this.body = body
  }
}

export default NetworkError
