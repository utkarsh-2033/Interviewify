import express from "express";
import {
  addInterview,
  sendInterviewDetails,
  submitInterview,
  getSubmittedInterview,
  sendAllInterviewDetails,
} from "../controllers/interview.controller.js";

const router = express.Router();
router.post("/interviews", addInterview);
router.get("/interviews/:email", sendInterviewDetails);
router.get("/interviews/getAll/:email", sendAllInterviewDetails);
router.post("/interviews/submit", submitInterview);
router.get("/interviews/feedback/:email", getSubmittedInterview);

export default router;
