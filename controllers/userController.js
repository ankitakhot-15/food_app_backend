import User from "../models/User.js";

/* ============================
   GET ALL USERS (Admin Only)
============================ */
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/* ============================
   UPDATE USER (Admin Only)
============================ */
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      message: "User updated",
      user: updatedUser,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

/* ============================
   DELETE USER (Admin Only)
============================ */
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
/* ============================
   All USER (Admin Only)
============================ */

// ✅ GET all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from database, sorted by creation date
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    // Exclude password from response

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
