import React, { useEffect, useState } from "react";
import DialogDemo from "@/components/AddInterview";
import { useEmail } from "@/UserContext";
import InterviewCard from "@/components/InterviewCard";

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { email } = useEmail();

  useEffect(() => {
    getInterviews();
  }, [email]);

  const getInterviews = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/interviews/getAll/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setInterviews(data);
      } else {
        console.error("Failed to fetch interviews");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mx-28 my-8">
      <div>
        <h1 className="text-4xl font-bold text-primary my-4">Dashboard</h1>
        <DialogDemo />
      </div>
      <div className="mt-12">
        <h1 className="text-2xl font-bold text-primary">
          Your Interviews:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {interviews.map((interview) => (
            <InterviewCard key={interview.mockId} interview={interview} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
