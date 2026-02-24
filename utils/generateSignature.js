import crypto from "crypto";

const orderId = "order_xxxxx";
const paymentId = "pay_test123";
const secret = process.env.RAZORPAY_KEY_SECRET;

const body = orderId + "|" + paymentId;

const signature = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex");

console.log(signature);