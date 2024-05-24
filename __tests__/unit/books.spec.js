import booksService from '../../src/services/books.js';
import client from '../../client.js';
import { newBook, createdBook, updatedBookInfo, updatedBook, bookList } from '../fixtures/books.js';
import jest from 'jest-mock';

client.book.create = jest.fn();
client.book.findUnique = jest.fn();
client.book.findMany = jest.fn();
client.book.update = jest.fn();
client.book.delete = jest.fn();

describe('books createBook function', () => {
  test('should create a book and return the created book object', async () => {
    client.book.create.mockResolvedValue(createdBook);
    const result = await booksService.createBook(newBook);
    
    expect(client.book.create).toHaveBeenCalledWith({
      data: {
        title: newBook.title,
        price: newBook.price,
        publishDate: new Date(newBook.publishDate),
        Author: {
          connectOrCreate: {
            where: {
              name: newBook.authorName,
              nationality: newBook.authorNationality,
            },
            create: {
              name: newBook.authorName,
              nationality: newBook.authorNationality,
            },
          },
        },
        Publisher: {
          connectOrCreate: {
            where: {
              name: newBook.publisherName,
              city: newBook.publisherCity,
              phone: newBook.publisherPhone,
            },
            create: {
              name: newBook.publisherName,
              city: newBook.publisherCity,
              phone: newBook.publisherPhone,
            },
          },
        },
      }
    });
    expect(result).toEqual(createdBook);
  });
});

describe('books getBook function', () => {
  test('should return a book by ID', async () => {
    client.book.findUnique.mockResolvedValue(createdBook);
    const result = await booksService.getBook(createdBook.id);
    expect(client.book.findUnique).toHaveBeenCalledWith({
      where: { id: createdBook.id },
    });
    expect(result).toEqual(createdBook);
  });

  test('should throw an error if no book is found', async () => {
    client.book.findUnique.mockResolvedValue(null);
    await booksService.getBook(createdBook.id).catch((err) => {
      expect(err.statusCode).toEqual(400);
      expect(err.errorMessage).toEqual("No book with id.");
    });
  });
});

describe('books getBooks function', () => {
  test('should return books within a specified price range', async () => {
    client.book.findMany.mockResolvedValue(bookList);
    const lowerPrice = 10;
    const upperPrice = 50;
    const result = await booksService.getBooks(lowerPrice, upperPrice);
    expect(client.book.findMany).toHaveBeenCalledWith({
      where: {
        price: {
          gt: lowerPrice,
          lt: upperPrice,
        },
      },
      orderBy: {
        price: 'desc',
      }
    });
    expect(result).toEqual(bookList);
  });

  test('should throw an error if no books are found within price range', async () => {
    const lowerPrice = 10;
    const upperPrice = 50;
    client.book.findMany.mockResolvedValue(50, 60);
    await booksService.getBooks(lowerPrice, upperPrice).catch((err) => {
      expect(err.statusCode).toEqual(400);
      expect(err.errorMessage).toEqual(`No books found with price range: ${lowerPrice} - ${upperPrice}`);
    });
  });
});

describe('books updateBook function', () => {
  test('should update book details', async () => {
    client.book.update.mockResolvedValue(updatedBook);
    const result = await booksService.updateBook(updatedBook.id, updatedBookInfo);
    expect(client.book.update).toHaveBeenCalledWith({
      where: { id: updatedBook.id },
      data: updatedBookInfo,
    });
    expect(result).toEqual(updatedBook);
  });

  test('should throw an error if no book is found to update', async () => {
    client.book.update.mockResolvedValue(null, null);
    await booksService.updateBook(updatedBook.id, updatedBookInfo).catch((err) => {
      expect(err.statusCode).toEqual(400);
      expect(err.errorMessage).toEqual("Book not found");
    });
  });
});

describe('books deleteBook function', () => {
  test('should delete a book by id', async () => {
    client.book.delete.mockResolvedValue(createdBook);
    const result = await booksService.deleteBook(createdBook.id);
    expect(client.book.delete).toHaveBeenCalledWith({
      where: { id: createdBook.id },
    });
    expect(result).toEqual(createdBook);
  });

  test('should throw an error if no book is found to delete', async () => {
    client.book.delete.mockResolvedValue(null);
    await booksService.deleteBook(createdBook.id).catch((err) => {
      expect(err.statusCode).toEqual(400);
      expect(err.errorMessage).toEqual("Book not found");
    });
  });
});
