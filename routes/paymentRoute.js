import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management APIs
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
 *               - userId
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               userId:
 *                 type: string
 *                 example: 65f123abc456xyz789000111
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 *       500:
 *         description: Server error
 */
router.post("/create-order", createPaymentOrder);

/**
 * @swagger
 * /api/payment/verify-payment:
 *   post:
 *     summary: Verify Razorpay Payment Signature
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 example: order_Mabcd1234
 *               razorpay_payment_id:
 *                 type: string
 *                 example: pay_Mabcd1234
 *               razorpay_signature:
 *                 type: string
 *                 example: 123456abcdef7890
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid signature
 *       500:
 *         description: Server error
 */
router.post("/verify-payment", verifyPayment);

export default router;