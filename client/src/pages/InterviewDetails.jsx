import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
import { Lightbulb, LucideWebcam } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEmail } from "../UserContext";

const InterviewDetails = () => {
  const [interview, setInterview] = useState({});
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const navigate = useNavigate();

  const { mockId } = useParams();
  // const { user , isLoaded } = useUser();
  // const email = user?.primaryEmailAddress?.emailAddress;
  const { email } = useEmail();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    fetch(`${backendUrl}/api/interviews/${email}?mockId=${mockId}`)
      .then((response) => response.json())
      .then((data) => setInterview(data))
      .catch((error) => console.error(error));
  }, [mockId, email]);

  // if (!isLoaded) return <div>Loading...</div>;

  const navigateHandler = () => {
    navigate(`/interview/${mockId}/live`);
  };

  return (
    <div className="mx-24 mt-8">
      <h1 className="mt-12 mb-4 text-2xl font-bold text-center">
        {" "}
        Mock Interview Details:
      </h1>
      <div className="flex flex-row gap-12">
        <div className="flex flex-col gap-6 flex-1 mt-8">
          <div className=" p-8 py-12 bg-gray-10 border shadow-sm border-gray-200 rounded-md">
            <p className="mb-2">
              <strong>Job Role/Job Position : </strong>
              {interview.role}
            </p>
            <p className="mb-2">
              <strong>Tech Stack : </strong>
              {interview.description}
            </p>
            <p>
              <strong>Experience : </strong>
              {interview.experience} years
            </p>
          </div>
          <div className="bg-yellow-100 border-yellow-700 text-yellow-600 p-4 rounded-md">
            <h1 className="font-bold text-lg flex items-center gap-2 mb-3">
              <Lightbulb />
              Information
            </h1>
            <p className="text-md font-semibold">
              Enable Video Web Cam and Microphone to Start your Al Generated
              Mock Interview, It Has 5 question which you can answer and at the
              last you will get the report on the basis of your answers. NOTE
              Web cam access you can diable at any the if you want.
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center gap-4">
          {!webcamEnabled ? (
            <div className="bg-gray-100 h-72 w-auto rounded-lg flex border border-gray-300 items-center justify-center">
              {" "}
              <LucideWebcam className="h-1/2 w-1/2" />
            </div>
          ) : (
            <div className="bg-black h-72 w-auto rounded-lg flex border border-gray-300 items-center justify-center">
              <Webcam
                mirrored={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
          <Button
            className="bg-primary active:bg-red-300 text-white font-bold p-4 rounded-md"
            onClick={() => setWebcamEnabled(!webcamEnabled)}
          >
            {webcamEnabled ? "Disable" : "Enable"} WebCam & Microphone
          </Button>
          <Button
            onClick={navigateHandler}
            variant="ghost"
            className="bg-green-600 active:bg-red-300 text-white font-bold p-4 rounded-md"
          >
            {" "}
            Start Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
