import React from "react";

export function LoginLeft() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#f8f0be] px-6 md:px-8 lg:px-12">
      <div className="text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-[#303030] mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Welcome Back!
        </h1>
        <p
          className="text-lg md:text-xl text-[#898a87] leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Continue managing your projects efficiently and stay on top of your
          deadlines.
        </p>
      </div>
    </div>
  );
}
