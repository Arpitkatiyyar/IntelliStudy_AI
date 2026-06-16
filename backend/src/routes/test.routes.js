import express from "express";
import redisClient from "../config/redis.js"
import { Router } from "express";
import { studentInfo,test } from "../controllers/test.controller.js";
const router = Router();
router.get("/",test)

router.get("/student",studentInfo);
router.get("/redis-test", async (req, res) => {

  await redisClient.set(
    "test",
    "Hello Redis"
  );

  const value =
    await redisClient.get("test");

  res.json({
    value
  });

});

export default router
