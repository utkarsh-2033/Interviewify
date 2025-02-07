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

//  inidetails={role,desc,}
export default function DialogDemo() {
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");
  const [experience, setExperience] = useState(0);

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    console.log(role,desc,experience);
  }
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
              className="bg-gray-100 px-6 mr-4"
            >
              Cancel
            </Button>
            <Button type="submit">Start Interview</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
