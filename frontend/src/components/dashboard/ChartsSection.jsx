import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { FolderOpen } from "lucide-react";

export default function ChartsSection({ projectWiseData }) {
  return (
    <div className="card bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-[#FFD75F]/30 transition-all hover:shadow-2xl lg:col-span-2">
      <div className="card-body p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
          <div>
            <h2
              className="card-title text-base sm:text-lg font-bold flex flex-wrap items-center gap-2"
              style={{ fontFamily: "var(--font-heading)", color: "#303030" }}
            >
              <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFD75F]" />
              Project-wise Tasks
            </h2>
            <p
              className="text-xs sm:text-sm"
              style={{ fontFamily: "var(--font-body)", color: "#898A87" }}
            >
              Compare task load and progress across projects
            </p>
          </div>
          <span className="px-2 sm:px-3 py-1 text-xs sm:text-xs font-medium rounded-full border border-[#FFD75F] bg-[#FFD75F]/10 text-[#303030] mt-2 sm:mt-0">
            Stacked by status
          </span>
        </div>

        {/* Chart */}
        <div className="h-64 sm:h-72">
          {projectWiseData?.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectWiseData}
                margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  stroke="#898A87"
                  fontSize={10}
                  interval={0}
                  height={40}
                  angle={-15}
                  tickMargin={6}
                />
                <YAxis stroke="#898A87" fontSize={10} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #FFD75F",
                    borderRadius: "12px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                    fontFamily: "var(--font-body)",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: "10px",
                    fontFamily: "var(--font-body)",
                    color: "#303030",
                  }}
                />
                <Bar dataKey="todo" stackId="a" name="Todo" fill="#FFD75F" />
                <Bar
                  dataKey="inProgress"
                  stackId="a"
                  name="In Progress"
                  fill="#52565d"
                />
                <Bar dataKey="done" stackId="a" name="Done" fill="#e1e4e2" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div
              className="h-full grid place-items-center text-sm rounded-xl"
              style={{ color: "#898A87" }}
            >
              No projects yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
