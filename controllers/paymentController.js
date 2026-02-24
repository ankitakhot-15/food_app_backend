import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create Razorpay Order
 */
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const options = {
      amount: amount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      user: userId,
      orderId: order.id,
      amount,
      currency: "INR",
      status: "created",
    });

    res.status(200).json({
      success: true,
      order,
      payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

/**
 * Verify Razorpay Payment
 */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    // Update payment status in DB
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        status: "paid",
        paymentId: razorpay_payment_id,
      },
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
