import React from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Lightbulb, Mic } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

import { useEffect } from "react";
import { chatSession } from "../../../gemini";
import { useEmail } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const WebCam = ({ questions, activeQuestion, mockId }) => {
  const { email } = useEmail();
  const navigate = useNavigate();
  const [interviewSubmission, setInterviewSubmission] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (interimResult) {
      setCurrentAnswer((prev) => {
        // Avoid adding repeated words by comparing last part of prev & interimResult
        if (!prev.endsWith(interimResult.trim())) {
          return prev + " " + interimResult.trim();
        }
        return prev;
      });
    }
  }, [interimResult]);
  
  

  //   console.log(questions[activeQuestion]);
  const onSubmitAnswer = async () => {
    
    if (currentAnswer.length < 10) {
      toast.error("too short answer");
      return;
    }
    const prompt =
      "Analyze the given answer as a Mock Interviewer expert. Provide feedback on what is wrong, suggestions for improvement, and a rating out of 5. Ensure the feedback is concise (5-6 lines max) and return the response in JSON format with 'feedback' and 'rating' fields only Question: " +
      questions[activeQuestion].question +
      " Answer: " +
      currentAnswer;
    const result = await chatSession.sendMessage(prompt);
    const response = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(response);
    const json = JSON.parse(response);
    const newSubmission = {
      index: activeQuestion,
      question: questions[activeQuestion].question,
      correctanswer: questions[activeQuestion].answer,
      useranswer: currentAnswer,
      feedback: json.feedback,
      rating: json.rating,
    };
    // console.log(newSubmission);
    setInterviewSubmission([...interviewSubmission, newSubmission]);
    setCurrentAnswer("");
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async () => {
    console.log("Interview submission:", interviewSubmission);
    const submission = {
      email,
      mockId,
      interviewSubmission,
    };
    try {
      const res = await fetch(`${backendUrl}/api/interviews/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submission,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit interview");
      }

      const data = await res.json();
      console.log("Submission successful:", data);
      navigate(`/interview/${mockId}/feedback`);
      toast.success("Interview submitted successfully!");
    } catch (error) {
      console.error("Error submitting interview:", error);
      toast.error("Failed to submit interview. Please try again.");
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      setCurrentAnswer(results[results.length - 1].transcript);
    }
  }, [results]);

  if (error) {
    console.error("Speech to text error:", error);
    toast.error("Speech to text error. Please use Chrome Browser");
    return <div className="p-4 bg-red-100 rounded-md mt-4">
      <h1 className="text-red-500 font-bold" >Speech to text error</h1>
      <p className="text-gray-600 mt-2">{error}</p>
      <p className="text-red-500 mt-2">Please use Chrome Browser</p>
    </div>;
  }
  return (
    <div className="flex flex-col justify-center gap-2 md:gap-4">
      <div className="bg-black h-84 w-auto rounded-lg flex border border-gray-300 items-center justify-center">
        <Webcam mirrored={true} style={{ width: "80%", height: "85%" }} />
      </div>

      <Button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        variant="ghost"
        className={`bg-gray-100 active:bg-red-500 font-bold p-4 rounded-md`}
      >
        <Mic /> {isRecording ? "Stop" : "Start"} Recording
      </Button>
      <Button
        onClick={onSubmitAnswer}
        className=" text-white active:bg-red-400 font-bold p-4 rounded-md"
      >
        {" "}
        Submit Answer
      </Button>
      <div className="md:mt-4 p-4 bg-transparent rounded-md">
        {/* <h2 className="font-bold">Cu
        rrent Answer:</h2> */}
        <p>{interimResult}</p>
      </div>
      {activeQuestion == questions.length - 1 && (
        <Button
          onClick={submitHandler}
          className="bg-green-500 text-center hover:bg-green-400 active:bg-red-400 text-white p-4 rounded-md mt-4"
        >
          {" "}
          Submit Interview
        </Button>
      )}
      
    </div>
  );
};

export default WebCam;
