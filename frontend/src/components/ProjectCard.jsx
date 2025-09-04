import React from "react";
import useProjectStore from "../store/useProjectStore";

const ProjectCard = ({
  title,
  description,
  deadline,
  progress,
  completedTasks,
  totalTasks,
  status,
  onEdit,
  onDelete,
}) => {
  const { isDeletingProject, isUpdatingProject } = useProjectStore();
  return (
    <div
      className="shadow-md rounded-2xl p-5 hover:shadow-lg transition-all relative"
      style={{
        background: "white",
        color: "#303030",
      }}
    >
      {/* Title & Status */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full`}
          style={{
            backgroundColor:
              status === "in-progress"
                ? "#FFD75F"
                : status === "near-completion"
                ? "#d9ffb3"
                : "#e1e4e2",
            color: "#303030",
          }}
        >
          {status.replace("-", " ")}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm mb-2"
        style={{ color: "#898A87", minHeight: "40px" }}
      >
        {description || "No description provided."}
      </p>

      {/* Deadline */}
      <p
        className="text-xs mb-2 font-medium"
        style={{ color: "#303030", opacity: 0.8 }}
      >
        Deadline:{" "}
        {new Date(deadline).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1 font-semibold">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-2"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(to right, #FFD75F, #f8f0be)`,
              borderRadius: "inherit",
            }}
          ></div>
        </div>
      </div>

      {/* Tasks */}
      <p
        className="text-xs mt-2 font-medium"
        style={{ color: "#898A87", opacity: 0.9 }}
      >
        {completedTasks}/{totalTasks} tasks completed
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        {onEdit && (
          <button
            disabled={isUpdatingProject}
            onClick={onEdit}
            className="px-3 py-2 text-xs font-semibold rounded-lg transition"
            style={{
              backgroundColor: "#FFD75F",
              color: "#303030",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {isUpdatingProject ? "Editing..." : "Edit"}
          </button>
        )}
        {onDelete && (
          <button
            disabled={isDeletingProject}
            onClick={onDelete}
            className="px-3 py-1 text-xs font-semibold rounded-lg transition"
            style={{
              backgroundColor: "#303030",
              color: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {isDeletingProject ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
