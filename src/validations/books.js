import Joi from "joi";

const createBooks = Joi.object({
    title: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
    price: Joi.number().positive().precision(2).min(0.01).required(),
    publishDate: Joi.date().required(),
    authorId: Joi.number().integer().positive(),
    publisherId: Joi.number().integer().positive(),
    authorName: Joi.string().min(3),
    authorNationality: Joi.string().min(3),
    publisherName: Joi.string().min(3),
    publisherCity: Joi.string().min(3),
    publisherPhone: Joi.string().length(10),
});

const updateBook = Joi.object({
    title: Joi.string().min(3),
    genre: Joi.string().min(3),
    price: Joi.number().positive().precision(2).min(0.01),
    publishDate: Joi.date(),
    authorId: Joi.number().integer().positive(),
    publisherId: Joi.number().integer().positive(),
}).min(1);

const getBooks = Joi.object({
    lowerPrice: Joi.number().precision(2).min(0).required(),
    upperPrice: Joi.number().positive().precision(2).min(Joi.ref('lowerPrice')).required(),
});

const checkId = Joi.object({
    id: Joi.number().integer().positive().required(),
});

export default {
    createBooks,
    updateBook,
    checkId,
    getBooks,
};