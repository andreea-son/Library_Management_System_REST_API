import prisma from "../../client.js";

const blacklistToken = async (token, expiresAt) => {
    return await prisma.blacklistedToken.create({
        data: {
            token,
            expiresAt: new Date(expiresAt * 1000),
        }
    });
}

const isTokenBlacklisted = async (token) => {
    const result = await prisma.blacklistedToken.findUnique({
        where: {
            token: token,
        }
    });

    if(result)
        return true;
    return false;
}

const cleanupExpiredTokens = async() => {
    await prisma.blacklistedToken.deleteMany({
        where: {
            expiresAt: {
                lt: new Date()
            }
        }
    });
}

export default {
    blacklistToken,
    isTokenBlacklisted,
    cleanupExpiredTokens,
};