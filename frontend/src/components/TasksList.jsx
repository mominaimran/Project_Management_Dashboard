import React from "react";
import { Edit, Trash } from "lucide-react";

const TasksList = ({ tasks, onDelete, onEdit }) => {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mt-2">
      {/* Header row */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">
          All Tasks
        </h3>
        <span className="text-gray-600 text-sm">{tasks.length} Tasks</span>
      </div>

      {/* ✅ Desktop / Tablet: Table View */}
      <div className="hidden sm:block max-h-[400px] overflow-y-auto rounded-lg border">
        <div className="min-w-[700px]">
          {/* Table Headings */}
          <div className="grid grid-cols-5 font-semibold text-gray-700 border-b pb-2 mb-2 bg-white sticky top-0 z-10">
            <div>Title</div>
            <div>Description</div>
            <div>Project</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Table Rows */}
          {tasks.map((task) => (
            <div
              className="grid grid-cols-5 items-center py-2 border-b last:border-none text-sm hover:bg-gray-50"
              key={task._id}
            >
              <div className="truncate">{task.title}</div>
              <div className="truncate">{task.description}</div>
              <div className="truncate">
                {task.project?.title || "Unknown Project"}
              </div>
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.status === "done"
                      ? "bg-green-100 text-green-600"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onEdit(task)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(task._id)}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Mobile: Card View */}
      <div className="sm:hidden space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border rounded-lg p-3 shadow-sm hover:shadow-md transition"
          >
            {/* Row 1: Title + Project */}
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-900 text-sm">
                {task.title}
              </p>
              <p className="text-xs text-gray-500">
                {task.project?.title || "Unknown Project"}
              </p>
            </div>

            {/* Row 2: Description */}
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>

            {/* Row 3: Status + Actions */}
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  task.status === "done"
                    ? "bg-green-100 text-green-600"
                    : task.status === "in-progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {task.status}
              </span>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onEdit(task)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(task._id)}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
