import User from "../models/user.model.js";

export const addInterview = async (req, res) => {
    const {email, interview} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    user.interviews.push(interview);
    await user.save();
    res.status(201).json({message: "Interview added successfully" , mockId: interview.mockId});
};

export const sendInterviewDetails = async (req, res) => {
    const email = req.params.email;
    const mockId = req.query.mockId;
    // console.log(email, mockId);
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    const interview = user.interviews.find(interview => interview.mockId === mockId);
    if (!interview) {
        console.log("Interview not found");
        return res.status(404).json({message: "Interview not found"});
    }
    res.status(200).json(interview);
}

export const submitInterview = async (req, res) => {
    const {email, mockId, interviewSubmission} = req.body.submission;
    console.log(email, mockId);
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }

    // Check if an interview with the same mockId already exists
    const existingInterviewIndex = user.interviewResults.findIndex(interview => interview.mockId === mockId);
    if (existingInterviewIndex !== -1) {
        // Remove the existing interview
        user.interviewResults.splice(existingInterviewIndex, 1);
    }

    user.interviewResults.push({mockId, details: interviewSubmission});
    await user.save();
    res.status(201).json({message: "Interview submitted successfully"});
}

export const getSubmittedInterview= async (req, res) => {
    const email = req.params.email;
    const mockId = req.query.mockId;
    const user = await User.findOne({email});   
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    const interview = user.interviewResults.find(interview => interview.mockId === mockId);
    if (!interview) {
        console.log("Interview not found");
        return res.status(404).json({message: "Interview not found"});
    }
    // console.log(interview.details);
    res.status(200).json(interview.details);
}

export const sendAllInterviewDetails = async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user.interviews);
}