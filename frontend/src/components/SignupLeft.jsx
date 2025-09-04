import React from "react";
import { Briefcase, Clock, BarChart3 } from "lucide-react";

export function SignupLeft() {
  return (
    <div className="w-full box-border flex flex-col justify-center px-6 md:px-8 lg:px-12 py-6 md:py-12">
      <div className="max-w-md mx-auto md:mx-0">
        <div className="mb-10 text-center md:text-left">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#303030] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ProjectHub
          </h1>
          <p
            className="text-lg md:text-xl text-[#898a87] mb-6 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            All your projects in one place, designed specially for freelancers.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-[#ffd75f] p-3 rounded-full flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-[#303030]" />
            </div>
            <div>
              <h3
                className="text-[#303030] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Visual Dashboard
              </h3>
              <p
                className="text-[#898a87] text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Get a quick overview of project progress, tasks, and deadlines
                with charts and analytics.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-[#ffd75f] p-3 rounded-full flex-shrink-0">
              <Briefcase className="w-6 h-6 text-[#303030]" />
            </div>
            <div>
              <h3
                className="text-[#303030] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Project Organization
              </h3>
              <p
                className="text-[#898a87] text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Organize and track all your projects effortlessly
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-[#ffd75f] p-3 rounded-full flex-shrink-0">
              <Clock className="w-6 h-6 text-[#303030]" />
            </div>
            <div>
              <h3
                className="text-[#303030] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Time Tracking
              </h3>
              <p
                className="text-[#898a87] text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Manage deadlines and tasks in one place. Never miss a deadline
                again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
