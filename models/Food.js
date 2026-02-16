

import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    menuName: { type: String, required: true, default: "General" },
    type: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      required: true,
      default: "Veg", // default can be Veg
    },
  },
  { timestamps: true },
);

export default mongoose.model("Food", foodSchema);
