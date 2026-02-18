// import swaggerJSDoc from "swagger-jsdoc";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Food App API",
//       version: "1.0.0",
//       description: "API documentation for Food App",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//   },
//   apis: [path.join(__dirname, "../routes/*.js")], // ✅ absolute safe path
// };

// const swaggerSpec = swaggerJSDoc(options);

// export default swaggerSpec;

import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food App API",
      version: "1.0.0",
      description: "API documentation for Food App",
    },
    servers: [
      {
        url: isProduction
          ? "https://food-app-backend-1-rrad.onrender.com"
          : "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
