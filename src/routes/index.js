import express from "express";
import booksRouter from "./books.js";
import publishersRouter from "./publishers.js";
import authorsRouter from "./authors.js";
import usersRouter from "./users.js";

const router = express.Router();

router.use("/books", booksRouter);
router.use("/publishers", publishersRouter);
router.use("/authors", authorsRouter);
router.use("/users", usersRouter);

export default router;
