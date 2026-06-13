import express from "express";

import { Router } from "express";
import { studentInfo,test } from "../controllers/test.controller.js";
const router = Router();
router.get("/",test)

router.get("/student",studentInfo)
export default router
