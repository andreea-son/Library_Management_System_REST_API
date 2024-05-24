import express from "express";
import validate from "../middlewares/validate.js";
import publishersValidations from "../validations/publishers.js";
import publishersController from "../controllers/publishers.js";
import validateToken from "../middlewares/validate-token.js";

const router = express.Router();

/**
 * @swagger
 * /publishers:
 *   post:
 *     description: Create a new publisher
 *     tags: [Publishers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/publisherCreateDTO'
 *     responses:
 *       201:
 *         description: Publisher created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   get:
 *     description: Get list of all publishers filtered by city
 *     tags: [Publishers]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter publishers by city
 *     responses:
 *       200:
 *         description: List of publishers filtered by city
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/publisher'
 *       404:
 *         description: No publishers found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No publishers found"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 * /publishers/{id}:
 *   get:
 *     description: Get a single publisher by ID
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publisher object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/publisher'
 *       404:
 *         description: Publisher not found
 *       500:
 *         description: Server error
 *   patch:
 *     description: Update an existing publisher
 *     tags: [Publishers]
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
 *             $ref: '#/components/schemas/publisherUpdateDTO'
 *     responses:
 *       200:
 *         description: Updated publisher
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       404:
 *         description: Publisher not found
 *       500:
 *         description: Server error
 *   delete:
 *     description: Delete a publisher
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Publisher deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Publisher not found
 *       500:
 *         description: Server error
 */

router
  .route("/")
  .post(validateToken(), validate({body: publishersValidations.createPublishers}), publishersController.createPublisher)
  .get(validate({query: publishersValidations.getPublishers}), publishersController.getPublishers);

router
  .route("/:id")
  .get(validate({params: publishersValidations.checkId}), publishersController.getPublisher)
  .patch(validateToken(), validate({params: publishersValidations.checkId, body: publishersValidations.updatePublisher}), publishersController.updatePublisher)
  .delete(validateToken(), validate({params: publishersValidations.checkId}), publishersController.deletePublisher);

export default router;
