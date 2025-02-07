import React from "react";
import logo from "../../assets/logoipsum-295.svg";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="flex flex-row justify-between items-center px-8 py-4 shadow-sm bg-slate-300">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-6" />
          <Link
            to={"/"}
            className="ml-2 text-purple-800 text-2xl font-extrabold"
          >
            Interviewify
          </Link>
        </div>
        <div className="flex gap-16">
          <Link
            to={"/"}
            className="font-bold hover:scale-100 text-lg transition-all"
          >
            About
          </Link>
          <Link
            to={"/dashboard"}
            className="font-bold text-lg hover:scale-100 transition-all"
          >
            Dashboard
          </Link>
          <Link
            to={"/"}
            className="font-bold text-lg hover:scale-100 transition-all"
          >
            History
          </Link>
        </div>
        <div>
          <SignedOut>
            <Link to={"/signin"} className="font-semibold hover:scale-100 transition-all" >Signin</Link>
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
