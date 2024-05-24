import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import prisma from "../../client.js";
import httpError from "../utils/httpError.js";
import backlistedTokensService from "./backlistedToken.js";

const signup = async (userInfo, profileImage) => {
    const { password, ...user } = userInfo;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
        data: {
            ...user,
            password: hashedPassword,
            profileImage: profileImage,
        }
    });

    return result;
};

const signin = async (userInfo) => {
    const { username, password } = userInfo;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!user) {
        throw new httpError(400, "Cannot find user.");
    }

    if (bcrypt.compareSync(password, user.password)) {
        const payload = {
            id: user.id,
            username: user.username,
        }
        const jwtId = uuidv4();
        const options = {
            expiresIn: '1h',
            jwtid: jwtId
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);

        return accessToken;
    } else {
        throw new httpError(401, "Unauthorized");
    }
};

const logout = async (token) => {
    if (!token) {
        throw new httpError(401, "No token provided");
    }
    
    const decoded = jwt.decode(token);
    const expires = decoded.exp;

    await backlistedTokensService.blacklistToken(token, expires);
    
    return "Successfully logged out and token blacklisted.";
};

const getProfile = async (username) => {
    let baseURL;
    if (process.env.NODE_ENV === 'development') {
        baseURL = `http://${process.env.HOST}:${process.env.PORT}/`;
    }

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            username: true,
            email: true,
            profileImage: true,
        }
    });

    if (!user) {
        throw new httpError(400, "Cannot find user.");
    }

    if (user.profileImage) {
        user.profileImage = baseURL + user.profileImage;
    }

    return user;
};

export default {
    signup,
    signin,
    getProfile,
    logout,
}
