import React from "react";
import { FolderOpen } from "lucide-react";

export default function CurrentProjects({
  projects = [],
  loading = false,
  showAll = false,
  setShowAll = () => {},
}) {
  const hasProjects = Array.isArray(projects) && projects.length > 0;

  return (
    <div className="card bg-white/80 backdrop-blur-sm shadow-md rounded-2xl">
      <div className="card-body">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2
              className="card-title text-[#303030] flex items-center gap-2 text-lg sm:text-xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <FolderOpen className="h-5 w-5 text-yellow-500" />
              Current Projects
            </h2>
            <p className="text-gray-500 text-sm">
              Active projects with pending tasks
            </p>
          </div>

          {hasProjects && projects.length > 3 && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition w-full sm:w-auto"
            >
              {showAll ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
              >
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />
                <div className="h-2 w-full bg-gray-200 rounded" />
                <div className="h-2 w-2/3 bg-gray-200 rounded mt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !hasProjects && (
          <div className="mt-4 p-6 border border-dashed border-gray-300 rounded-xl text-center text-gray-500 text-sm bg-gray-50">
            🎉 All caught up! No active projects with pending tasks.
          </div>
        )}

        {/* Projects List */}
        {!loading && hasProjects && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {(showAll ? projects : projects.slice(0, 3)).map((p) => (
              <div
                key={p._id}
                className="p-4 rounded-xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all bg-white group"
              >
                {/* Project Header */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#303030] text-sm truncate group-hover:text-yellow-700 transition-colors">
                    {p.title}
                  </h4>
                  <span
                    className={`text-xs font-medium ${
                      p.dueDays < 0
                        ? "text-red-600"
                        : p.dueDays === 0
                        ? "text-orange-500"
                        : "text-gray-500"
                    }`}
                    title={
                      p.deadline
                        ? new Date(p.deadline).toLocaleDateString()
                        : ""
                    }
                  >
                    {p.dueText}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>
                      {p.completedTasks}/{p.totalTasks} tasks
                    </span>
                    <span className="font-medium text-gray-800">
                      {p.progress}%
                    </span>
                  </div>

                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full"
                      style={{
                        width: `${p.progress}%`,
                        background: `linear-gradient(to right, #ffd75f, #f8f0be)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
