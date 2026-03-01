const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SIO Kasir API",
      version: "1.0.0",
      description: "Backend API untuk Sistem Informasi Kasir",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            barcode: { type: "string" }
          }
        }
      }
      ,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    path.join(__dirname, "routes/*.js"),
    path.join(__dirname, "controllers/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;