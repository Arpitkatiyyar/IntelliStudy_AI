import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import testRoutes from "./routes/test.routes.js";
import studyRoutes from "./routes/study.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import flashcardsRoutes from "./routes/flashcard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
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
