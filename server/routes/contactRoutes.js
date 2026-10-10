import express from "express";
import { createContactMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContactMessage); // POST /api/contact

export default router;
