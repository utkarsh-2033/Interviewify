import React from "react";
import hero from "../assets/hero-section.jpg";
import logo from "../assets/logoipsum-295.svg";
import SignIn from "@/components/auth/Login";

const Signin = () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={hero}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="flex justify-center mb-4">
              <a className="block text-blue-600" href="/" type="_blank">
                <img src={logo} className="h-8 " />
              </a>
            </div>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Signin;
