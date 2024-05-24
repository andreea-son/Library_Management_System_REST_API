import prisma from "../../client.js";
import prismaErrors from "../constants/prisma-errors.js";
import httpError from "../utils/httpError.js";

const createPublisher = async (publisherInfo) => {
    const result = await prisma.publisher.create({
        data: {
            ...publisherInfo,
        },
    });
    return result;
};

const getPublisher = async (publisherId) => {
    const result = await prisma.publisher.findUnique({
        where: {
            id: publisherId,
        },
    });

    if (!result) {
        throw new httpError(404, "No publisher with id.");
    }

    return result;
};

const updatePublisher = async (publisherId, publisherInfo) => {
    const result = await prisma.publisher.update({
        where: {
            id: publisherId,
        },
        data: {
            ...publisherInfo,
        },
    }).catch((err) => {
        if (err.code === prismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, "Publisher not found");
        }
        throw err;
    });

    return result;
};

const deletePublisher = async (publisherId) => {
    const result = await prisma.publisher.delete({
        where: {
            id: publisherId,
        },
    }).catch((err) => {
        if (err.code === prismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, "Publisher not found");
        }
        throw err;
    });

    return result;
};

const getPublishers = async (city) => {
    const publishers = await prisma.publisher.findMany({
        where: {
            city: {
                equals: city,
            }
        },
    });

    if (!publishers) {
        throw new httpError(404, "No publishers found");
    }

    return publishers;
};

export default {
    createPublisher,
    getPublisher,
    updatePublisher,
    deletePublisher,
    getPublishers,
};
