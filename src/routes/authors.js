import express from "express";
import validate from "../middlewares/validate.js";
import authorsValidations from "../validations/authors.js";
import authorsController from "../controllers/authors.js";
import validateToken from "../middlewares/validate-token.js";

const router = express.Router();

/**
 * @swagger
 * /authors:
 *   post:
 *     description: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/authorCreateDTO'
 *     responses:
 *       201:
 *         description: Created author
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/author'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   get:
 *     description: Get a paginated list of all authors
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number of the authors listing
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of authors per page
 *     responses:
 *       200:
 *         description: A paginated list of authors
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/author'
 *       404:
 *         description: No authors found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No authors found"
 *       400:
 *         description: Invalid page or limit parameters
 *       500:
 *         description: Server error
 * /authors/{id}:
 *   get:
 *     description: Get a single author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the author
 *     responses:
 *       200:
 *         description: Author object
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/author'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 *   patch:
 *     description: Update an existing author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/authorUpdateDTO'
 *     responses:
 *       200:
 *         description: Updated author
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/author'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 *   delete:
 *     description: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the author
 *     responses:
 *       204:
 *         description: Author deleted
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */

router
  .route("/")
  .post(validateToken(), validate({body: authorsValidations.createAuthors}), authorsController.createAuthor)
  .get(validate({query: authorsValidations.getAuthors}), authorsController.getAuthors);

router
  .route("/:id")
  .get(validate({params: authorsValidations.checkId}), authorsController.getAuthor)
  .patch(validateToken(), validate({params: authorsValidations.checkId, body: authorsValidations.updateAuthor}), authorsController.updateAuthor)
  .delete(validateToken(), validate({params: authorsValidations.checkId}), authorsController.deleteAuthor);

export default router;
