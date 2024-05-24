import Joi from "joi";

const createAuthors = Joi.object({
    name: Joi.string().min(3).required(),
    nationality: Joi.string().min(3).required(),
});

const updateAuthor = Joi.object({
    name: Joi.string().min(3),
    nationality: Joi.string().min(3),
}).min(1);

const checkId = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const getAuthors = Joi.object({
    page: Joi.number().integer().positive().min(1).required(),
    limit: Joi.number().integer().positive().min(1).required(),
});

export default {
    createAuthors,
    updateAuthor,
    checkId,
    getAuthors,
};