const BaseController = require('@core/controller');
const logger = require('@helpers/logger');
const BookService = require('./book.service');
const { pick } = require('lodash');

class BookController extends BaseController {

    async handleGetList(request, response, next) {
        try {
            let filters = pick(request.query, ['userId', 'authorPseudonym', 'title', 'description', 'search']);
            let pagination = pick(request.query, ['page', 'perPage']);
            let sort = pick(request.query, ['field', 'order']);

            let result = await BookService.getList(filters, pagination, sort);

            return this.retrievedResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

    async handleGetbyUuid(request, response, next) {
        try {

            const { uuid } = request.params;
            let result = await BookService.getByUuid(uuid);

            return this.retrievedResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

    async handleCreateBook(request, response, next) {
        try {

            const authUser = request.authUser;
            const payload = pick(request.body, ['title', 'description', 'price']);
            let result = await BookService.create(authUser, payload);
            return this.createdResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

    async handleUpdateBook(request, response, next) {
        try {

            const authUser = request.authUser;
            const payload = pick(request.body, ['title', 'description', 'price']);
            const param = pick(request.params, ['uuid']);

            let result = await BookService.update(authUser.id, param.uuid, payload);
            return this.updatedResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

    async handleDeleteBook(request, response, next) {
        try {

            const authUser = request.authUser;
            const param = pick(request.params, ['uuid']);

            let result = await BookService.delete(authUser.id, param.uuid);
            return this.deletedResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = BookController