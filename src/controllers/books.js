import booksService from "../services/books.js";
import logger from "../utils/logger.js";

const createBook = async (req, res, next) => {
    try {
        logger.info(`Adding book.`);
        const result = await booksService.createBook(req.body);

        res.status(201).send(result);
    } catch (err) {
        next(err);
    }
};

const getBook = async (req, res, next) => {
    try {
        const id = +req.params.id;
        logger.info(`Retrieving book with id: ${id}`);
        const result = await booksService.getBook(id);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const getBooks = async (req, res, next) => {
    try {
        const lowerPrice = parseFloat(req.query.lowerPrice);
        const upperPrice = parseFloat(req.query.upperPrice);
        
        logger.info(`Retrieving books with price between ${lowerPrice} and ${upperPrice}`);
        
        const result = await booksService.getBooks(lowerPrice, upperPrice);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const id = +req.params.id;
        
        logger.info(`Updating book with id: ${id}`);
        const result = await booksService.updateBook(id, req.body);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const id = +req.params.id;
        
        logger.info(`Deleting book with id: ${id}`);
        const result = await booksService.deleteBook(id);

        res.status(204).send(result);
    } catch (err) {
        next(err);
    }
};

export default {
    createBook,
    getBook,
    updateBook,
    deleteBook,
    getBooks,
};
