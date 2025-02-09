import React from "react";
import Hero from "../components/Hero";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useEmail } from "../UserContext";

const Home = () => {
   const { user } = useUser();
   const {email,setEmail}=useEmail();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
      if (user) {
        fetch(`${backendUrl}/api/auth/clerk`, {
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
      setEmail(user?.primaryEmailAddress?.emailAddress);
    }, [user,setEmail]);
    console.log(email);
  return (
    <div>
        <Hero/>
    </div>
  );
};

export default Home;
