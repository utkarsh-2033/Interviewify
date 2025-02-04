import React from "react";
import hero from "../assets/hero-section.jpg";
import { Button } from "@/components/ui/button"


const Hero = () => {
  return (
    <div className="flex flex-row min-h-screen items-center gap-6 mx-8">
      <div className="  max-w-md px-24">
        <h2 className="text-3xl font-bold text-purple-950 my-4">Interviewify</h2>
        <p className="text-xl font-semibold">Boost your confidence and ace your next job interview with Interviewify,
        your AI-driven mock interviewer. Get real-time feedback, tackle
        industry-specific questions, and refine your responses—all in an
        interactive, stress-free environment. 🚀💡 Practice. Improve. Succeed.</p>
        <Button className="mt-3 text-center text-xl px-8 py-2 bg-primary text-white hover:bg-secondary border-border"  variant="ghost">Start</Button>

      </div>
      <div className=" border rounded-sm border-slate-300 max-w-3xl">
        <img src={hero} alt="" />
      </div>
    </div>
  );
};

export default Hero;
