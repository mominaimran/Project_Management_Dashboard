// components/StatusDropdown.jsx
import { useState, useRef, useEffect } from "react";

export default function StatusDropdown({ selectedStatus, setSelectedStatus }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const statuses = ["todo", "in-progress", "done"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-sm mb-4">
      <button
        className="w-1/2 border border-[#e1e4e2] rounded-md px-2 py-2 text-left bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD75F]"
        onClick={() => setOpen(!open)}
      >
        {selectedStatus ? selectedStatus : "All Statuses"}
      </button>

      {open && (
        <div className="flex flex-col w-1/2 border border-[#e1e4e2] rounded-md bg-white shadow-sm mt-1">
          <div
            className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => { setSelectedStatus(null); setOpen(false); }}
          >
            All Statuses
          </div>
          {statuses.map((status) => (
            <div
              key={status}
              className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer capitalize"
              onClick={() => { setSelectedStatus(status); setOpen(false); }}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
