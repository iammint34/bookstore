const { retrievedResponse, createdResponse, updatedResponse, deletedResponse } = require('@core/controller');
const logger = require('@helpers/logger');
const BookService = require('./book.service');
const { pick } = require('lodash');

const handleGetList = async (request, response, next) => {
    try {
        let filters = pick(request.query, ['userId', 'authorPseudonym', 'title', 'description', 'search']);
        let pagination = pick(request.query, ['page', 'perPage']);
        let sort = pick(request.query, ['field', 'order']);

        let result = await BookService.getList(filters, pagination, sort);

        return retrievedResponse(response, result);
    } catch (error) {
        next(error)
    }
};

const handleGetbyUuid = async (request, response, next) => {
    try {

        const { uuid } = request.params;
        let result = await BookService.getByUuid(uuid);

        return retrievedResponse(response, result);
    } catch (error) {
        next(error)
    }
};

const handleCreateBook = async (request, response, next) => {
    try {

        const authUser = request.authUser;
        const payload = pick(request.body, ['title', 'description', 'coverImage', 'price']);
        let result = await BookService.create(authUser, payload);
        return createdResponse(response, result);
    } catch (error) {
        next(error)
    }
};

const handleUpdateBook = async (request, response, next) => {
    try {

        const authUser = request.authUser;
        const payload = pick(request.body, ['title', 'description', 'coverImage', 'price']);
        const param = pick(request.params, ['uuid']);

        let result = await BookService.update(authUser.id, param.uuid, payload);
        return updatedResponse(response, result);
    } catch (error) {
        next(error)
    }
};

const handleDeleteBook = async (request, response, next) => {
    try {

        const authUser = request.authUser;
        const param = pick(request.params, ['uuid']);

        let result = await BookService.delete(authUser.id, param.uuid);
        return deletedResponse(response, result);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    handleGetList,
    handleGetbyUuid,
    handleCreateBook,
    handleUpdateBook,
    handleDeleteBook
};
