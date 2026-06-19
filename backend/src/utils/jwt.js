import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const genrateAccesstoken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};
export const genrateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
