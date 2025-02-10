import React from "react";
import logo from "../../assets/logoipsum-295.svg";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <header>
      <div className="flex flex-row justify-between items-center px-1 md:px-8 py-4 shadow-sm bg-slate-300">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-4 md:h-6" />
          <Link
            to={"/"}
            className="ml-1 md:ml-2 text-purple-800 text-md md:text-2xl font-extrabold"
          >
            Interviewify
          </Link>
        </div>
        <div className="flex gap-2 md:gap-12 items-center">
          <Link
            to={"/"}
            className="font-bold hover:scale-100 text-xs md:text-lg transition-all"
          >
            About
          </Link>
          <Link
            to={"/dashboard"}
            className="font-bold text-xs md:text-lg hover:scale-100 transition-all"
          >
            Dashboard
          </Link>
          {/* <Link
            to={"/"}
            className="font-bold text-lg hover:scale-100 transition-all"
          >
            History
          </Link> */}
        </div>
        <div>
          <SignedOut>
            <Link to={"/signin"} className=" flex items-center font-semibold text-xs md:text-lg pl-2 py-1 border rounded-md bg-blue-600 text-white hover:scale-100 transition-all" >Signin <LogIn height={12}/> </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
