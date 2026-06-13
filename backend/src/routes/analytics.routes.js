import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {getWeakTopics} from '../controllers/analytics.controller.js'
const router=express.Router();

router.get("/weak-topics",authMiddleware,getWeakTopics)
export default router;
