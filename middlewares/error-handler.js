const errorHandler = (err, req, res, next) => {
    let statusCode, errors = err.errors, message = err.message, success = false
    let error = (err.constructor.name == 'Error' && err.code) ? err.code : err.constructor.name

    switch (error) {
        case 'AuthenticationError':
            statusCode = 403;
            break;

        case 'ValidatorError':
            statusCode = 400;
            break;
            
        default:
            statusCode = 500
    }
    res.status(statusCode).json({ success, error, message, errors })
}

module.exports = errorHandler

