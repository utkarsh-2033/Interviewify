import express from "express";
import { handleClerkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/clerk", handleClerkAuth);

export default router;
