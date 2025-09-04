import { useState, useRef, useEffect } from "react";

export default function PushDropdown({
  projects,
  selectedProject,
  setSelectedProject,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-sm mb-6">
      <button
        className="w-1/2 border border-[#e1e4e2] rounded-md px-2 py-2 text-left text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD75F]"
        onClick={() => setOpen(!open)}
      >
        {selectedProject
          ? projects.find((p) => p._id === selectedProject)?.title
          : "All Projects"}
      </button>

      {open && (
        <div className="flex flex-col w-1/2 border border-[#e1e4e2] rounded-md bg-white shadow-sm mt-1">
          <div
            className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedProject("");
              setOpen(false);
            }}
          >
            All Projects
          </div>
          {projects?.map((project) => (
            <div
              key={project._id}
              className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedProject(project._id);
                setOpen(false);
              }}
            >
              {project.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
