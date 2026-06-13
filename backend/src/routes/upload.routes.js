import express from 'express';
import { upload } from '../config/multer.js';
import {authMiddleware} from '../middleware/auth.middleware.js'
import { uploadPdf } from '../controllers/upload.controller.js';
const router=express.Router();

router.post("/pdf",authMiddleware,upload.single("file"),uploadPdf);
export default router;
