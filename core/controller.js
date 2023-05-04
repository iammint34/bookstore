const tokenResponse = (response, token, message = "User authenticated successfully!") => {
    const statusCode = 201;

    apiResponse(response, statusCode, { tokenType: `Bearer`, accessToken: token }, message);
};

const retrievedResponse = (response, data, message = "Record(s) retrieved successfully!") => {
    const statusCode = 200;

    apiResponse(response, statusCode, data, message);
};

const createdResponse = (response, data, message = "Record(s) created successfully!") => {
    const statusCode = 201;

    apiResponse(response, statusCode, data, message);
};

const updatedResponse = (response, data, message = "Record(s) updated successfully!") => {
    const statusCode = 200;

    apiResponse(response, statusCode, data, message);
};

const deletedResponse = (response, data, message = "Record(s) deleted successfully!") => {
    const statusCode = 200;

    apiResponse(response, statusCode, data, message);
};

const apiResponse = (response, statusCode, data, message) => {
    response.status(statusCode).send({
        success: true,
        message,
        data
    });
};

const generateErrorObj = (msg, param, value, record, location) => {
    return { msg, param, value, record, location };
};

module.exports = {
    tokenResponse,
    retrievedResponse,
    createdResponse,
    updatedResponse,
    deletedResponse,
    generateErrorObj
};
