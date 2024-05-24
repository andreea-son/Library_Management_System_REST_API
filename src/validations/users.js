import Joi from "joi";

const signupTextSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string().min(8).required(),
});

const signupFileSchema = Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
    // max size: 5MB
    size: Joi.number().less(5000000),
});

const signin = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
});

export default {
    signin,
    signupFileSchema,
    signupTextSchema,
}