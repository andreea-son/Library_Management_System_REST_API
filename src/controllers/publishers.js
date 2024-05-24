import publishersService from "../services/publishers.js";
import logger from "../utils/logger.js";

const createPublisher = async (req, res, next) => {
    try {
        logger.info(`Adding publisher.`);
        const result = await publishersService.createPublisher(req.body);

        res.status(201).send(result);
    } catch (err) {
        next(err);
    }
};

const getPublisher = async (req, res, next) => {
    try {
        const id = +req.params.id;
        logger.info(`Retrieving publisher with id: ${id}`);
        const result = await publishersService.getPublisher(id);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const getPublishers = async (req, res, next) => {
    try {
        const city = req.query.city;
        logger.info(`Retrieving publishers with city: ${city}`);
        const result = await publishersService.getPublishers(city);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const updatePublisher = async (req, res, next) => {
    try {
        const id = +req.params.id;

        const result = await publishersService.updatePublisher(id, req.body);
        logger.info(`Updating publisher with id: ${id}`);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const deletePublisher = async (req, res, next) => {
    try {
        const id = +req.params.id;

        const result = await publishersService.deletePublisher(id);
        logger.info(`Deleting publisher with id: ${id}`);

        res.status(204).send(result);
    } catch (err) {
        next(err);
    }
};

export default {
    createPublisher,
    getPublisher,
    updatePublisher,
    deletePublisher,
    getPublishers,
};
