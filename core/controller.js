class BaseController {

    tokenResponse(response, token, message = "User authenticated successfully!") {
        const statusCode = 200

        this.apiResponse(response, statusCode, { tokenType: `Bearer`, accessToken: token }, message)
    }

    retrievedResponse(response, data, message = "Record(s) retrieved successfully!") {
        const statusCode = 200

        this.apiResponse(response, statusCode, data, message)
    }

    createdResponse(response, data, message = "Record(s) created successfully!") {
        const statusCode = 201

        this.apiResponse(response, statusCode, data, message)
    }

    updatedResponse(response, data, message = "Record(s) updated successfully!") {
        const statusCode = 200

        this.apiResponse(response, statusCode, data, message)
    }

    deletedResponse(response, data, message = "Record(s) deleted successfully!") {
        const statusCode = 200

        this.apiResponse(response, statusCode, data, message)
    }

    apiResponse(response, statusCode, data, message) {
        response.status(statusCode).send({
            success: true,
            message,
            data
        })
    }

    generateErrorObj(msg, param, value, record, location) {
        return { msg, param, value, record, location }
    }
}

module.exports = BaseController