export const newBook = {
  title: 'New Book',
  price: 25.00,
  publishDate: '2024-01-01',
  authorName: 'John Doe',
  authorNationality: 'Canadian',
  publisherName: 'GlobalBooks',
  publisherCity: 'Toronto',
  publisherPhone: '1234567890'
};

export const createdBook = {
  id: 1,
  title: newBook.title,
  price: newBook.price,
  publishDate: new Date(newBook.publishDate),
  authorId: 1,
  publisherId: 1
};

expect(createdBook.authorId).toBeDefined();
expect(createdBook.publisherId).toBeDefined();

export const updatedBookInfo = {
  title: 'Updated Book',
  price: 30.00
};

export const updatedBook = {
  ...createdBook,
  ...updatedBookInfo
};

export const bookList = [
  createdBook,
  {
    id: 2,
    title: 'Second Book',
    price: 15.00,
    publishDate: new Date('2023-12-01'),
    authorId: 1,
    publisherId: 1
  }
];
