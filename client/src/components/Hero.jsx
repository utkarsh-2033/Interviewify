import React from "react";
import hero from "../assets/hero-section.jpg";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row mt-12 md:mt-20 items-center gap-6 md:mx-24">
      <div className="  max-w-md px-4 md:px-24">
        <h2 className=" text-xl  md:text-3xl font-bold text-purple-950 my-4">Interviewify</h2>
        <p className="text-sm md:text-xl font-semibold">Boost your confidence and ace your next job interview with Interviewify,
        your AI-driven mock interviewer. Get real-time feedback, tackle
        industry-specific questions, and refine your responses—all in an
        interactive, stress-free environment. 🚀💡 Practice. Improve. Succeed.</p>
        <Button 
        onClick={() => {
          navigate("/dashboard");
        }}
        className="mt-3 text-center text-xl px-8 py-2 bg-primary text-white hover:bg-secondary border-border"  variant="ghost">Start</Button>

      </div>
      <div className=" border rounded-sm border-slate-300 max-w-3xl">
        <img src={hero} alt="" />
      </div>
    </div>
  );
};

export default Hero;
