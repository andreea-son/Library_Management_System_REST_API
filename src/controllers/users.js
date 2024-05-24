import usersService from "../services/users.js";
import logger from "../utils/logger.js";

const signup = async (req, res, next) => {
    try {
        logger.info("Creating user.");

        const profileImage = req.file ? req.file.path : null;
        const result = await usersService.signup(req.body, profileImage);

        res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}

const signin = async (req, res, next) => {
    try {
        logger.info(`Signing in user with username: ${req.body.username}`);
        const accessToken = await usersService.signin(req.body);

        res.status(200).json({ accessToken });
    } catch (err) {
        next(err);
    }
}

const getProfile = async (req, res, next) => {
    const username = req.user.username;
    try {
        logger.info(`Retrieving profile for signed in user`);
        const result = await usersService.getProfile(username);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        logger.info(`Logging out user`);
        const result = await usersService.logout(token);

        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

export default {
    signin,
    signup,
    getProfile,
    logout,
}