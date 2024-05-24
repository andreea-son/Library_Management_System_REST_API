import prisma from "../../client.js";
import prismaErrors from "../constants/prisma-errors.js";
import httpError from "../utils/httpError.js";

const createBook = async (bookInfo) => {
    const { publishDate, authorId, authorName, authorNationality, publisherId, publisherName, publisherCity, publisherPhone, ...book } = bookInfo;

    const data = {
        ...book,
        publishDate: new Date(publishDate),
    };

    if (authorId) {
        data.Author = {
            connect: {
                id: authorId,
            },
        };
    } else if (authorName && authorNationality) {
        data.Author = {
            connectOrCreate: {
                where: { 
                    name: authorName,
                },
                create: {
                    name: authorName,
                    nationality: authorNationality,
                },
            },
        };
    } else {
        throw new httpError(400, "Not enough information for author.");
    }

    if (publisherId) {
        data.Publisher = {
            connect: {
                id: publisherId,
            }, 
        };
    } else if (publisherName && publisherCity && publisherPhone) {
        data.Publisher = {
            connectOrCreate: {
                where: { 
                    name: publisherName,
                    phone: publisherPhone, 
                },
                create: {
                    name: publisherName,
                    city: publisherCity,
                    phone: publisherPhone,
                },
            },
        };
    } else {
        throw new httpError(400, "Not enough information for publisher.");
    }

    const result = await prisma.book.create({ data: data });
    return result;
};

const getBook = async (bookId) => {
    const result = await prisma.book.findUnique({
        where: {
            id: bookId,
        },
    });

    if (!result) {
        throw new httpError(404, "No book with id.");
    }

    return result;
};

const updateBook = async (bookId, bookInfo) => {
    const { publishDate, publisherId, authorId, ...book } = bookInfo;
    const updateData = { ...book };

    if (publishDate) {
        updateData.publishDate = new Date(publishDate);
    }

    if (authorId) {
        updateData.Author = {
            connect: {
                id: authorId,
            }, 
        };
    }

    if(publisherId) {
        updateData.Publisher = {
            connect: {
                id: publisherId,
            }, 
        };
    }

    const result = await prisma.book.update({
        where: {
            id: bookId,
        },
        data: updateData,
    }).catch((err) => {
        if (err.code === prismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, "Book not found");
        }
        throw err;
    });

    return result;
};

const deleteBook = async (bookId) => {
    const result = await prisma.book.delete({
        where: {
            id: bookId,
        },
    }).catch((err) => {
        if (err.code === prismaErrors.RECORD_NOT_FOUND) {
            throw new httpError(404, "Book not found");
        }
        throw err;
    });

    return result;
};

const getBooks = async (lowerPrice, upperPrice) => {
    const books = await prisma.book.findMany({
        where: {
            price: {
                gt: lowerPrice,
                lt: upperPrice,
            },
        },
        orderBy: {
            price: 'desc',
        },
    });

    if (!books[0]) {
        throw new httpError(404, `No books found with price range: ${lowerPrice} - ${upperPrice}`);
    }

    return books;
};

export default {
    createBook,
    getBook,
    updateBook,
    deleteBook,
    getBooks,
};
