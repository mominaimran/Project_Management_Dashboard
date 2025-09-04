import React from "react";
import { Calendar } from "lucide-react";

const HeroSection = ({ user }) => {
  // Function to get dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="relative px-6 pt-6 pb-4 rounded-3xl">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Welcome Text */}
          <div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#303030",
              }}
            >
              {getGreeting()}, {user?.name}! 👋
            </h1>

            <p
              className="text-sm"
              style={{
                color: "#303030",
                fontFamily: "var(--font-body)",
              }}
            >
              Your workspace is ready — let’s get started 🚀
            </p>
          </div>

          {/* Date Badge */}
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-sm shadow"
            style={{
              backgroundColor: "#f8f0be",
              borderColor: "#FFD75F",
              color: "#303030",
            }}
          >
            <Calendar className="h-4 w-4" style={{ color: "#898A87" }} />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
