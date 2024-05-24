import express from "express";
import validate from "../middlewares/validate.js";
import booksValidations from "../validations/books.js";
import booksController from "../controllers/books.js";
import validateToken from "../middlewares/validate-token.js";

const router = express.Router();

/**
 * @swagger
 * /books:
 *   post:
 *     description: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/bookCreateDTO'
 *     responses:
 *       201:
 *         description: Created book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/book'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   get:
 *     description: Get list of all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: lowerPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: upperPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/book'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *
 * /books/{id}:
 *   get:
 *     description: Get a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the book
 *     responses:
 *       200:
 *         description: Book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 *   patch:
 *     description: Update an existing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/bookUpdateDTO'
 *     responses:
 *       200:
 *         description: Updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/book'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 *   delete:
 *     description: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

router
  .route("/")
  .post(validateToken(), validate({body: booksValidations.createBooks}), booksController.createBook)
  .get(validate({query: booksValidations.getBooks}), booksController.getBooks);

router
  .route("/:id")
  .get(validate({params: booksValidations.checkId}), booksController.getBook)
  .patch(validateToken(), validate({params: booksValidations.checkId, body: booksValidations.updateBook}), booksController.updateBook)
  .delete(validateToken(), validate({params: booksValidations.checkId}), booksController.deleteBook);

export default router;
