import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { chatSession } from "../../gemini";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


export default function DialogDemo() {
  const [loading, setloading] = useState(false);
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");
  const [experience, setExperience] = useState(0);
  const { user } = useUser();
  const email = user.primaryEmailAddress.emailAddress;
  const navigate = useNavigate();
  // console.log(user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(role, desc, experience);
    setloading(true);
    const prompt = `Generate 5 technical interview questions with short answers in JSON format for a candidate applying for: Role: ${role} ,Tech Stack: ${desc} ,Experience: ${experience} years
Format the response as valid JSON with keys: question, answer`;
    const result = await chatSession.sendMessage(prompt);
    const response = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const json = JSON.parse(response);
    if (json) {
      setloading(false);
      const body = {
        email,
        interview: {
          role,
          description: desc,
          experience,
          questions: json,
          createdAt: new Date().toISOString(),
          mockId: uuidv4(),
        },
      };
      // console.log(body);
      fetch("http://localhost:5000/api/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate(`/interview/${data.mockId}`);
          // console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }
    
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-28 w-64 bg-gray-200 font-bold " variant="outline">
          + Add Interview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-secondary font-semibold text-2xl">
            Add Interview
          </DialogTitle>
          <DialogDescription>Enter the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitHandler}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="">
                Job Role/Position Applying For
              </Label>
              <Input
                id="role"
                placeholder="e.g., Frontend Developer, Backend Developer, Data Scientist, etc."
                className="p-5"
                required
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="">
                Job Description/Tech Stack
              </Label>
              <Input
                id="role"
                placeholder="e.g., JavaScript, React, Node.js, Data Structures & Algorithms, etc"
                className="p-5"
                required
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="experience" className="">
                Experience years
              </Label>
              <Input
                id="experience"
                placeholder="e.g., 2"
                className="p-5"
                required
                type="Number"
                max="50"
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              className="bg-gray-100 px-6 mr-4 "
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? (
                <span className="flex flex-row gap-2 font-bold">
                  <LoaderCircle className="animate-spin" />
                  Generating
                </span>
              ) : (
                <span>Start Interview</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
