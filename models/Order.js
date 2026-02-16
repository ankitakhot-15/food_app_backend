// const orderSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     products: [
//       {
//         food: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Food",
//         },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     totalPrice: { type: Number, required: true },

//     // NEW: Location tracking
//     location: {
//       type: {
//         type: String,
//         enum: ["Point"], // GeoJSON Point
//         default: "Point",
//       },
//       coordinates: {
//         type: [Number], // [longitude, latitude]
//         required: false, // optional if user doesn't share location
//       },
//     },
//   },
//   { timestamps: true },
// );

// // 2dsphere index for geospatial queries
// orderSchema.index({ location: "2dsphere" });

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // paymentStatus: {
    //   type: String,
    //   enum: ["Pending", "Paid", "Failed"],
    //   default: "Pending",
    // },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    deliveredAt: {
      type: Date,
    },

    // GeoJSON Location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        validate: {
          validator: function (value) {
            return !value || value.length === 2;
          },
          message: "Coordinates must be [longitude, latitude]",
        },
      },
    },
  },
  { timestamps: true },
);

// 2dsphere index for geospatial queries
orderSchema.index({ location: "2dsphere" });

// ✅ IMPORTANT: Export properly
const Order = mongoose.model("Order", orderSchema);
export default Order;
