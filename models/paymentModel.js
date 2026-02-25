import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String, // Razorpay Order ID
      required: true,
      unique: true, // ensure each order is stored only once
    },
    paymentId: {
      type: String, // Razorpay Payment ID
    },
    signature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      min: 1, // ensure positive amount
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["created", "success", "failed"], // matches your controller
      default: "created",
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
