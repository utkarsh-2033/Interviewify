import React from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { chatSession } from "../../../gemini";

import Webcam from "react-webcam";
// import { on } from "events";

const WebCam = ({ questions, activeQuestion }) => {
  const [interviewSubmission, setInterviewSubmission] = useState([]); //to store the question , useranswer , feedback from gemini api and rating in object form each
  const [currentAnswer, setCurrentAnswer] = useState(""); //to store the current answer of the user
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
      setCurrentAnswer(interimResult);
    }
  }, [interimResult]);

  //   console.log(questions[activeQuestion]);
  const onSubmitAnswer = async () => {
    // Handle the submission of the current answer
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
    console.log(response);
    const json = JSON.parse(response);
    const newSubmission = {
      index: activeQuestion,
      question: questions[activeQuestion].question,
      answer: currentAnswer,
      feedback: json.feedback,
      rating: json.rating,
    };
    console.log(newSubmission);
    setInterviewSubmission([...interviewSubmission, newSubmission]);
    setCurrentAnswer("");
  };

  const submitHandler = async () => {
    console.log("Interview submission:", interviewSubmission);
    try {
        const res = await fetch("http://localhost:5000/api/interviews/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                interviewSubmission,
            }),
        });
        if (!res.ok) {
            throw new Error("Failed to submit interview");
        }

        const data = await res.json();
        console.log("Submission successful:", data);
        toast.success("Interview submitted successfully!");
    } catch (error) {
        console.error("Error submitting interview:", error);
        toast.error("Failed to submit interview. Please try again.");
    }
  }

  useEffect(() => {
    if (results.length > 0) {
      setCurrentAnswer(results[results.length - 1].transcript);
    }
  }, [results]);

  if (error) {
    console.error("Speech to text error:", error);
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="bg-black h-84 w-auto rounded-lg flex border border-gray-300 items-center justify-center">
        <Webcam mirrored={true} style={{ width: "80%", height: "85%" }} />
      </div>

      <Button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        variant="ghost"
        className="bg-gray-100 font-bold p-4 rounded-md"
      >
        <Mic /> {isRecording ? "Stop" : "Start"} Recording
      </Button>
      <Button
        onClick={onSubmitAnswer}
        variant="ghost"
        className="bg-primary text-white font-bold p-4 rounded-md"
      >
        {" "}
        Submit Answer
      </Button>
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        {/* <h2 className="font-bold">Cu
        rrent Answer:</h2> */}
        <p>{currentAnswer}</p>
      </div>
      {activeQuestion ==questions.length - 1 && (
        <Button
          onClick={submitHandler}
          className="bg-green-500 text-center hover:bg-green-500 active:bg-red-500 text-white p-4 rounded-md mt-4 mr-4"
        >
          {" "}
          Submit
        </Button>
      )}
    </div>
  );
};

export default WebCam;
