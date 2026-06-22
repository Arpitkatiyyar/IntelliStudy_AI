import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser'
import redisClient from "./config/redis.js";
import testRoutes from "./routes/test.routes.js";
import studyRoutes from "./routes/study.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import flashcardsRoutes from "./routes/flashcard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
const app = express();
app.use(cors({
  origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],  
  credentials: true,               
}));
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use("/api/test", testRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/flashcards", flashcardsRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/upload",uploadRoutes)
app.get("/", (req, res) => {
  res.json({
    message: "ai backend running....",
  });
});

export default app;
