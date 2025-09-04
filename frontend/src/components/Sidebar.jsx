import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FolderOpen,
  CheckSquare,
  Settings,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Overview & analytics",
    path: "/",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderOpen,
    description: "Manage projects",
    path: "/projects",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
    description: "Track tasks",
    path: "/tasks",
  },
];

const Sidebar = ({onClose}) => {
  return (
    <motion.div
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white text-[var(--color-text-dark)] h-screen flex flex-col shadow-md  w-[268px] md:w-[250px] lg:w-[268px]"
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--color-light-gray)]/30">
        <motion.div
          className="flex items-center space-x-3"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-10 h-10 bg-btn rounded-xl flex items-center justify-center shadow">
            <BarChart3 className="w-5 h-5 text-[var(--color-text-dark)]" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-montserrat font-bold text-xl text-[var(--color-text-dark)]">
              ProjectHub
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onClose}
              end={item.path === "/"}
              className={({ isActive }) =>
                `w-full flex items-center h-12 px-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? "bg-[var(--color-btn)]/40 text-[var(--color-text-dark)] shadow-sm border border-[var(--color-btn)]/40"
                    : "text-[var(--color-light-gray)] hover:bg-[var(--color-bg-dark)]/30 hover:text-[var(--color-text-dark)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="ml-3 flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs opacity-60">
                      {item.description}
                    </span>
                  </span>
                  {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Settings */}
        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            `w-full flex items-center h-12 px-4 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-[var(--color-bg-light)]/60 text-[var(--color-text-dark)] shadow-sm border border-[var(--color-btn)]/40"
                : "text-[var(--color-light-gray)] hover:bg-[var(--color-bg-dark)]/30 hover:text-[var(--color-text-dark)]"
            }`
          }
        >
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="ml-3 flex flex-col items-start">
            <span className="font-medium">Settings</span>
            <span className="text-xs opacity-60">Preferences</span>
          </span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-light-gray)]/30">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="text-xs text-[var(--color-light-gray)]">
            © 2025 ProjectHub
          </p>
          <p className="text-xs text-[var(--color-light-gray)]/70">
            Version 1.0.0
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
