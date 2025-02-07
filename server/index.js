import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.route.js";
import interviewRouter from "./routes/interview.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI 
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


// Simple API route
app.get("/", (req, res) => {
  res.send("AI Mock Interviewer Backend is Running!");
});
app.use("/api", AuthRouter);
app.use("/api", interviewRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
