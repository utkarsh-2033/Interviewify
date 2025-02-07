import React from "react";
import Hero from "../components/Hero";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const Home = () => {
   const { user } = useUser();
  
    useEffect(() => {
      if (user) {
        fetch("http://localhost:5000/api/auth/clerk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username || user.firstName || "User",
            email: user.primaryEmailAddress?.emailAddress,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log("User authenticated:"))
          .catch((error) => console.error("Auth error:", error));
      }
    }, [user]);
  return (
    <div>
        <Hero/>
    </div>
  );
};

export default Home;
