class AppError extends Error {
  constructor (params) {
    super(params)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(params)).stack
    }

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }

    // Custom debugging information
    this.data = null
    this.date = new Date()
  }

  setData (data) {
    this.data = data
  }

  getData () {
    return this.data
  }
}

export default AppError
