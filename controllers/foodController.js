import mongoose from "mongoose";
import Food from "../models/Food.js";

// ✅ Admin or protected: Get all foods
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Public API: Menu for everyone
export const getMenu = async (req, res) => {
  try {
    // Fetch foods and include only necessary fields
    const foods = await Food.find()
      .sort({ createdAt: -1 })
      .select("name description price type"); // include type

    res.status(200).json({
      message: "Menu fetched successfully",
      menu: foods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Admin: Add new food
// export const addFood = async (req, res) => {
//   try {
//     const { name, description, price, menuName, imageUrl } = req.body;

//     if (!name || !description || !price || !imageUrl) {
//       return res
//         .status(400)
//         .json({ message: "All fields except menuName are required" });
//     }

//     const food = await Food.create({
//       name,
//       description,
//       price,
//       menuName: menuName || undefined,
//       imageUrl,
//     });

//     res.status(201).json({ message: "Food added successfully", food });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const addFood = async (req, res) => {
  try {
    const { name, description, price, menuName, imageUrl, type } = req.body;

    // Validate required fields
    if (!name || !description || !price || !imageUrl) {
      return res
        .status(400)
        .json({ message: "All fields except menuName and type are required" });
    }

    // Validate type
    const validTypes = ["Veg", "Non-Veg"];
    const foodType = type && validTypes.includes(type) ? type : "Veg"; // default to Veg

    const food = await Food.create({
      name,
      description,
      price,
      menuName: menuName || "General",
      imageUrl,
      type: foodType,
    });

    res.status(201).json({ message: "Food added successfully", food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Admin: Update food
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    food.name = req.body.name || food.name;
    food.description = req.body.description || food.description;
    food.price = req.body.price || food.price;
    food.menuName = req.body.menuName || food.menuName;
    food.imageUrl = req.body.imageUrl || food.imageUrl;

    const updatedFood = await food.save();
    res
      .status(200)
      .json({ message: "Food updated successfully", food: updatedFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Admin: Delete food
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const deletedFoodName = food.name; // store name before deleting

    await food.deleteOne();

    res.status(200).json({
      message: `${deletedFoodName} deleted successfully`,
      deletedFood: {
        id: food._id,
        name: deletedFoodName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// ✅ Public: Get single food details
export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Requested ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format");
      return res.status(400).json({ message: "Invalid Food ID" });
    }

    const food = await Food.findById(id);

    console.log("Food Found:", food);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.status(200).json({
      message: "Food details fetched successfully",
      food,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message, //
    });
  }
};
