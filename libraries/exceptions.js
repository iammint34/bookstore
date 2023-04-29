class ValidatorError extends Error {
    constructor(message, errors) {
        super(message)

        this.errors = errors
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message)
    }
}

class ConnectionError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { ValidatorError, AuthenticationError, ConnectionError }