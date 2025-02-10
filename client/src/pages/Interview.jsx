import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Questions from "@/components/Question/QuestionsIndex";
import WebCam from "@/components/Question/WebCam";
// import { useUser } from "@clerk/clerk-react";
import {useEmail} from "../UserContext";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const Interview = () => {
  const [interview, setInterview] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);

  const { mockId } = useParams();
  // const { user, isLoaded } = useUser();
  // const email = user?.primaryEmailAddress?.emailAddress;
  const { email } = useEmail();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/interviews/${email}?mockId=${mockId}`)
      .then((response) => response.json())
      .then((data) => setInterview(data))
      .catch((error) => console.error(error));
  }, [mockId]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "You have not submitted interview yet.All your submitted answers will be lost. Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!interview) return <div>Loading...</div>;

  return (interview && interview.questions) && (
    <div>
      <div className="md:mx-24 mt-8 gap-3 md:gap-12 grid grid-cols-1 md:grid-cols-2">
        <div className="mx-1 flex-1 border border-gray-200 p-4 bg-gray-10 rounded-md">
          <Questions
            activeQuestion={activeQuestion}
            questions={interview.questions}
          />
        </div>
        <div className="flex flex-col flex-1 mx-2 md:mx-0 justify-center gap-4">
          <WebCam 
          activeQuestion={activeQuestion}
          questions={interview.questions}
          mockId={mockId}
          onS
          />
        </div>
      </div>
      <div className="flex justify-end mr-20">
        {activeQuestion>0 && <Button 
        onClick={() => setActiveQuestion((prev) => prev - 1)}
        className="bg-primary text-white p-4 active:bg-green-400 rounded-md mt-4 mr-4">
          {" "}
          Previous
        </Button>}
        {activeQuestion<interview.questions.length-1 && <Button
          onClick={() => setActiveQuestion((prev) => prev + 1)}
          className="bg-primary text-white p-4 active:bg-green-400 rounded-md mt-4 mr-4"
        >
          Next Question
        </Button>}
        
      </div>
      <div className="md:hidden my-4 mx-2 bg-blue-100 border-blue-700 text-primary p-4 rounded-md">
              <h1 className="font-bold text-lg flex items-center gap-2 mb-3">
                <Lightbulb />
                Note
              </h1>
              <p className="text-sm font-semibold">
                Click on the start recording button to start recording your answer.
                Click on the Submit Answer button to submit your answer.
              </p>
            </div>
    </div>
  );
};

export default Interview;
