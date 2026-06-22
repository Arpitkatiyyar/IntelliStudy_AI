import express from "express";
import {
  registerUser,
  loginUser,
  refreshAcessToken,
  logoutUser,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {authMiddleware} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), registerUser);
router.post("/verify-otp", authLimiter, verifyOTP);
router.post("/login", authLimiter, validate(loginSchema), loginUser);

router.post("/refresh", refreshAcessToken);

router.post("/logout",authMiddleware, logoutUser);
export default router;
