import express from "express";
import {
  getFoods, // Admin / protected
  getMenu, // Public menu
  addFood,
  updateFood,
  deleteFood,
  getFoodById,
} from "../controllers/foodController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Food/Product management APIs
 */

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Update a food item (Admin only)
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Food updated successfully
 *       404:
 *         description: Food not found
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Delete a food item (Admin only)
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food deleted successfully
 *       404:
 *         description: Food not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - imageUrl
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           example: "Paneer Butter Masala"
 *         description:
 *           type: string
 *           example: "Delicious paneer curry"
 *         price:
 *           type: number
 *           example: 200
 *         imageUrl:
 *           type: string
 *           example: "http://example.com/paneer.jpg"
 *         menuName:
 *           type: string
 *           example: "Main Course"
 *         type:
 *           type: string
 *           enum: [Veg, Non-Veg]
 *           example: "Veg"
 */

/**
 * @swagger
 * /api/foods/menu:
 *   get:
 *     summary: Get all foods (Public, no token required)
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of foods available in menu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 menu:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Food'
 */
router.get("/menu", getMenu); // ✅ Public API

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Add a new food item (Admin only)
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Food added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized / token missing
 *       403:
 *         description: Forbidden / not admin
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get single food details (Public)
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 food:
 *                   $ref: '#/components/schemas/Food'
 *       400:
 *         description: Invalid Food ID
 *       404:
 *         description: Food not found
 */

router.post("/", protect, adminOnly, addFood);

// Admin / protected endpoints
router.get("/", protect, getFoods);
router.get("/:id", getFoodById);
router.put("/:id", protect, adminOnly, updateFood);
router.delete("/:id", protect, adminOnly, deleteFood);

export default router;
