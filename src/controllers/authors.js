import authorsService from "../services/authors.js";
import logger from "../utils/logger.js";

const createAuthor = async (req, res, next) => {
    try {
        logger.info(`Adding author.`);
        const result = await authorsService.createAuthor(req.body);

        res.status(201).send(result);
    } catch (err) {
        next(err);
    }
};

const getAuthor = async (req, res, next) => {
    try {
        const id = +req.params.id;
        logger.info(`Retrieving author with id: ${id}`);
        const result = await authorsService.getAuthor(id);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const getAuthors = async (req, res, next) => {
    try {
        const page = +req.query.page;
        const limit = +req.query.limit;

        logger.info(`Retrieving authors on ${page} page having maximum ${limit} records`);

        const result = await authorsService.getAuthors(page, limit);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const updateAuthor = async (req, res, next) => {
    try {
        const id = +req.params.id;
        logger.info(`Updating author with id: ${id}`);

        const result = await authorsService.updateAuthor(id, req.body);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const id = +req.params.id;
        logger.info(`Deleting author with id: ${id}`);

        const result = await authorsService.deleteAuthor(id);

        res.status(204).send(result);
    } catch (err) {
        next(err);
    }
};

export default {
    createAuthor,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthors,
};
