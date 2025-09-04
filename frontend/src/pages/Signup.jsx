import React from "react";
import { SignupLeft } from "../components/SignupLeft.jsx";
import { SignupForm } from "../components/SignupForm.jsx";

const Signup = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 lg:w-1/2 xl:w-1/2 bg-[#f8f0be] relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-[#ffd75f]/20 rounded-full -translate-y-8 md:-translate-y-16 translate-x-8 md:translate-x-16"></div>
        <div className="absolute bottom-12 right-40 w-16 h-16 md:w-24 md:h-24 bg-[#ffd75f]/30 rounded-full"></div>
        <div className="absolute top-32 md:top-40 left-24 md:left-20 w-12 h-12 md:w-16 md:h-16 bg-[#e1e4e2]/40 rounded-full"></div>

        <SignupLeft />

        {/* Vertical divider line */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#898a87]/30 to-transparent"></div>
      </div>

      {/* Right Side - Signup Form - Full width on small devices, half width on larger */}
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 bg-white relative flex">
        {/* Decorative elements for right side */}
        <div className="absolute top-8 right-8 md:top-4 md:right-16 w-16 h-16 md:w-20 md:h-20 bg-[#ffd75f]/10 rounded-full"></div>
        <div className="absolute bottom-18 md:bottom-6 left-20 md:left-20 w-16 h-16 md:w-16 md:h-16 bg-[#e1e4e2]/40 rounded-full"></div>

        <div className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Small device brand header - only visible on mobile */}
            <div className="md:hidden text-center mb-6 sm:mb-8">
              <h1
                className="text-2xl sm:text-3xl text-[#303030] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ProjectHub
              </h1>
            </div>

            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
