import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InterviewCard = ({ interview }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(interview.createdAt).toISOString().slice(0, 19).replace("T", " ");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary font-bold text-xl">{interview.role}</CardTitle>
        <CardDescription className="font-semibold text-gray-800">Tech Stack : {interview.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold text-gray-500">Created At :{formattedDate}</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button 
        onClick={() => {
          navigate(`/interview/${interview.mockId}/feedback`);}}
         variant="outline" className='w-full'>Feedback</Button>
        <Button 
        onClick={() => {
          navigate(`/interview/${interview.mockId}`);}}
        
        className='w-full'>Start</Button>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
