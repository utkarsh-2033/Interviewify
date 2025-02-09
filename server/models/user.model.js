import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  role: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: Number, required: true },
  questions: { type: [Object], default: [] }, // Array of JSON questions
  createdAt: { type: Date, default: Date.now },
  mockId: { type: String, required: true, unique: true },
});
const InterviewResultSchema = new mongoose.Schema({
  details: { type: [Object], default: [] }, // Array of JSON questions
  SumittedAtAt: { type: Date, default: Date.now },
  mockId: { type: String, required: true, unique: true },
});

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  interviews: { type: [InterviewSchema], default: [] }, // Array of interview objects
  interviewResults: { type: [InterviewResultSchema], default: [] },
});

const User = mongoose.model("User", UserSchema);

export default User;
