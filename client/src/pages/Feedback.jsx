import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmail } from "@/UserContext";
import { CrossIcon, ListCollapse, LogOut, ServerCrash, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [interview, setInterview] = useState(null);
  const { mockId } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { email } = useEmail();
  const navigate = useNavigate();

  useEffect(() => {
    getInterviewDetails();
  }, [mockId, email]);
  const getInterviewDetails = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/interviews/feedback/${email}?mockId=${mockId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInterview(data);
      } else {
        console.error("Failed to fetch interview details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateAverageRating = () => {
    if (!interview || !interview.length) return 0;
    const totalRating = interview.reduce((acc, curr) => acc + curr.rating, 0);
    return (totalRating / interview.length).toFixed(2);
  };

  return (
    <div className=" mx-2 md:mx-28 mt-8">
      <div>
      {!interview || interview.length==0 ?(<div>
        <h1 className="text-green-600 flex items-center font-semibold text-5xl my-6">Opps!<ServerCrash className="text-red-400"/> </h1>
      </div>):(
        <div>
        <h1 className="text-green-600 font-bold text-3xl">Congratulations!</h1>
        <h1 className="text-black font-bold text-xl mt-2">
          Here is your interview feedbcak.
        </h1>
        <h1 className="text-purple-600 font-semibold text-lg my-4">
          {" "}
          Your overall interview rating :{ calculateAverageRating()}
        </h1>
        </div>)}
        
        <Button
          onClick={() => {
            navigate("/dashboard");
          }}
          className=" font-semibold"
        >
          Go to Dashboard <LogOut />{" "}
        </Button>
        <p className="text-gray-400 mt-8 text-sm">
          Find the interview details below:
        </p>
        {((interview && interview.length < 5 && interview.length!=0) ? (
          <p className="text-red-300 text-sm font-semibold mt-4">
            You only answered {interview.length} questions out of 5.
          </p>): null)}
      </div>
      {!interview || interview.length==0 ? (
        <p className="text-red-600 text-lg font-bold mt-4 bg-blue-100 p-2 border border-blue-400 rounded-lg">
          No feedback to be shown because No Interview submitted for this yet!
        </p>
      ) : (
         
        <div className="mt-4">
          {interview &&
            interview.map((interview) => (
              <Collapsible key={interview.index}>
                <CollapsibleTrigger className="bg-gray-200 border active:bg-slate-100 border-gray-300 rounded-lg mb-4 mt-2 w-full text-left text-black p-2 font-semibold">
                  Question {interview.index + 1}: {interview.question}
                  <ListCollapse className="float-right" size={24} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="bg-purple-100 text-purple-900 border border-purple-400 rounded-sm mb-2 w-full text-left p-2">
                    <strong>Rating:</strong>
                    {interview.rating}
                  </p>
                  <p className="bg-red-100 text-red-900 border border-red-400 rounded-sm mb-2 w-full text-left p-2">
                    <strong>Your Answer:</strong>
                    {interview.useranswer}
                  </p>
                  <p className="bg-green-100 text-green-900 border border-green-400 rounded-sm mb-2 w-full text-left p-2">
                    <strong>Correct Answer:</strong>
                    {interview.correctanswer}
                  </p>
                  <p className="bg-blue-100 text-blue-900 border border-blue-400 rounded-sm mb-2 w-full text-left p-2">
                    <strong>Feedback:</strong>
                    {interview.feedback}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;
