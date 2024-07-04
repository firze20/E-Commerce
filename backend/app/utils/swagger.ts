import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express, Request, Response } from "express";
import logger from "./logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce REST API",
      description:
        "A portfolio project for E-Commerce REST API using Node.js, Express, TypeScript, TypeORM, PostgreSQL, Docker, and more.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt",
          description: "JWT token for authentication stored in a cookie",
        },
      }
    }
  },
  apis: ["./app/routes/**/*.ts"], // Path to the API docs// Path to the API docs
};

const swaggerSpecs = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger Page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Docs in JSON Format

  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
  });

  logger.info(
    `Swagger documentation is available at http://localhost:${port}/api-docs`
  );
}

export default swaggerDocs;
