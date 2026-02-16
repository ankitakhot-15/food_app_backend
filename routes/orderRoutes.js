// import express from "express";
// import {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
// } from "../controllers/orderController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Orders
//  *   description: Order management APIs
//  */
/**
//  * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order (User)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - food
 *                     - quantity
 *                   properties:
 *                     food:
 *                       type: string
 *                       example: 65f1a2b3c4d5e6f789012345
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               location:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Point
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [72.8777, 19.0760]
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */

// /**
//  * @swagger
//  * /api/orders/myorders:
//  *   get:
//  *     summary: Get logged-in user's orders
//  *     tags: [Orders]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of user's orders
//  */
// router.get("/myorders", protect, getMyOrders);

// /**
//  * @swagger
//  * /api/orders:
//  *   get:
//  *     summary: Get all orders (Admin only)
//  *     tags: [Orders]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of all orders
//  */
// router.get("/", protect, adminOnly, getAllOrders);

// export default router;
import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order (User)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - food
 *                     - quantity
 *                   properties:
 *                     food:
 *                       type: string
 *                       example: 65f2ab1234567890abcdef12
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               location:
 *                 type: object
 *                 properties:
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     example: [73.8567, 18.5204]
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post("/", protect, createOrder);

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get("/my", protect, getMyOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       403:
 *         description: Forbidden
 */
router.get("/", protect, adminOnly, getAllOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 */
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
