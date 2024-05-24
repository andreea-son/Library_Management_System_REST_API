import express from "express";
import validate from "../middlewares/validate.js";
import validateToken from "../middlewares/validate-token.js";
import usersValidations from "../validations/users.js";
import usersController from "../controllers/users.js";
import upload from '../middlewares/image-upload.js';

const router = express.Router();

/**
 * @swagger
 * /users/signin:
 *   post:
 *     description: Sign in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSignInDTO'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /users/signup:
 *   post:
 *     description: Sign up a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/userSignUpDTO'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *
 * /users/logout:
 *   post:
 *     description: Logout a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 *
 * /users/profile:
 *   get:
 *     description: Get user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       401:
 *         description: Unauthorized
 */

router
  .route("/signin")
  .post(validate({body: usersValidations.signin}), usersController.signin);

router
  .route("/signup")
  .post(upload.single('profileImage'), validate({ body: usersValidations.signupTextSchema, file: usersValidations.signupFileSchemafileSchema }), usersController.signup);

router
  .route("/logout")
  .post(validateToken(), usersController.logout);

router
  .route("/profile")
  .get(validateToken(), usersController.getProfile);
  
export default router;
