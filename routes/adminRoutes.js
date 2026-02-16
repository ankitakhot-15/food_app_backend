import express from "express";
import { loginUser, registerUser, createAdmin } 
from "../controllers/authController.js";

import { protect, adminOnly } 
from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin only route
router.post("/create-admin", protect, adminOnly, createAdmin);

export default router;
