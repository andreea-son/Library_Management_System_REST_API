import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import routes from "./src/routes/index.js";
import errorHandler from "./src/middlewares/error-handler.js";
import blacklistedTokensService from "./src/services/backlistedToken.js"
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

dotenv.config();

blacklistedTokensService.cleanupExpiredTokens().then(() => {
  console.log('Expired tokens cleaned up.');
});

var app = express();

app.use(express.json());

const uploadsPath = path.join('./uploads');

if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true });
}

app.use('/uploads', express.static(uploadsPath));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management System",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/**.js", "./swagger/schemas.yaml"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(
    `REST API server with env => ${process.env.NODE_ENV} ready at: ${process.env.HOST}:${process.env.PORT}`
  )
);

export default app;
