// Create Order (User)

import mongoose from "mongoose";
import Order from "../models/Order.js";
import Food from "../models/Food.js";

export const createOrder = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { products, location } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    let totalPrice = 0;

    const validatedProducts = await Promise.all(
      products.map(async (item) => {
        // Validate ObjectId properly
        if (!mongoose.Types.ObjectId.isValid(item.food)) {
          throw new Error(`Invalid food ID: ${item.food}`);
        }

        if (!item.quantity || item.quantity <= 0) {
          throw new Error("Quantity must be greater than 0");
        }

        const food = await Food.findById(item.food);

        if (!food) {
          throw new Error(`Food not found: ${item.food}`);
        }

        totalPrice += food.price * item.quantity;

        return {
          food: food._id,
          quantity: item.quantity,
        };
      }),
    );

    // Validate location
    let orderLocation;

    if (location) {
      if (
        !location.coordinates ||
        !Array.isArray(location.coordinates) ||
        location.coordinates.length !== 2
      ) {
        return res.status(400).json({
          message: "Location coordinates must be [longitude, latitude]",
        });
      }

      orderLocation = {
        type: "Point",
        coordinates: location.coordinates,
      };
    }

    const order = await Order.create({
      user: req.user._id,
      products: validatedProducts,
      totalPrice,
      location: orderLocation,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order Controller Error:", error);
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

// ✅ Get Logged-in User Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.food", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.food", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Admin - Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ❌ Prevent update after final state
    if (["Delivered", "Cancelled"].includes(order.status)) {
      return res.status(400).json({
        message: `Order already ${order.status}. Status cannot be changed.`,
      });
    }

    order.status = status;

    // ✅ Auto set delivered time
    if (status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
