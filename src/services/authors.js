import prisma from "../../client.js";
import prismaErrors from "../constants/prisma-errors.js";
import httpError from "../utils/httpError.js";

const createAuthor = async (authorInfo) => {
    const result = await prisma.author.create({
        data: {
            ...authorInfo,
        },
    });
    return result;
};

const getAuthor = async (authorId) => {
    const result = await prisma.author.findUnique({
        where: {
            id: authorId,
        },
    });

    if (!result) {
        throw new httpError(404, "No author with id.");
    }

    return result;
};

const updateAuthor = async (authorId, authorInfo) => {
    const result = await prisma.author.update({
        where: {
            id: authorId,
        },
        data: {
            ...authorInfo,
        },
    }).catch((err) => {
        if (err.code === prismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, "Author not found");
        }
        throw err;
    });

    return result;
};

const deleteAuthor = async (authorId) => {
    const result = await prisma.author.delete({
        where: {
            id: authorId,
        },
    }).catch((err) => {
        if (err.code === prismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, "Author not found");
        }
        throw err;
    });

    return result;
};

const getAuthors = async (page, limit) => {
    const offset = (page - 1) * limit;

    const authors = await prisma.author.findMany({
        skip: offset,
        take: limit,
    });

    if (!authors) {
        throw new httpError(404, "No authors found");
    }

    return authors;
};

export default {
    createAuthor,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthors,
};
