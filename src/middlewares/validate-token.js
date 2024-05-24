import jwt from 'jsonwebtoken';
import httpError from "../utils/httpError.js";
import backlistedTokensService from "../services/backlistedToken.js";

const authenticateToken = (options = {}) => async (req, res, next) => {
    const tokenField = options.tokenField || 'authorization';
    let token = req.headers[tokenField];

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return next(new httpError(401, "No token provided"));
    }

    const blacklisted = await backlistedTokensService.isTokenBlacklisted(token);

    if (blacklisted) {
        return next(new httpError(401, "Token has been blacklisted"));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? "Invalid token" : "Token expired";
            return next(new httpError(403, message));
        }

        req.user = user;
        next();
    });
};

export default authenticateToken;
