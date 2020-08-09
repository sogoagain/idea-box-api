class InvalidInputError extends Error {
  constructor(statusCode = 403, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidInputError)
    }

    this.name = 'InvalidInputError'
    this.statusCode = statusCode
    this.date = new Date()
  }
}

module.exports = InvalidInputError;
