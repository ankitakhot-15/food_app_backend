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
/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Razorpay Payment APIs
 */

/**
 * @swagger
 * /api/payment/create-order:
 *   post:
 *     summary: Create Razorpay Order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Razorpay order created
 */

/**
 * @swagger
 * /api/payment/verify-payment:
 *   post:
 *     summary: Verify Razorpay Payment and Place Order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *               userId:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               deliveryAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified & order saved
 */

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
