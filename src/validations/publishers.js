import Joi from "joi";

const createPublishers = Joi.object({
    name: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    phone: Joi.string().length(10).required(),
});

const updatePublisher = Joi.object({
    name: Joi.string().min(3),
    city: Joi.string().min(3),
    phone: Joi.string().length(10),
}).min(1);

const checkId = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const getPublishers = Joi.object({
    city: Joi.string().min(3).required(),
});

export default {
    createPublishers,
    updatePublisher,
    checkId,
    getPublishers,
};