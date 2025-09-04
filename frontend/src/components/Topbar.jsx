import React from "react";
import { Menu, LogOut } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const Topbar = ({ onMobileMenu }) => {
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="h-14 bg-white border-b border-[var(--color-light-gray)]/30 flex items-center justify-between px-4 md:px-6 shadow-sm">
      {/* Left side → Hamburger + User Info */}
      <div className="flex items-center gap-3 max-w-[70%]">
        {/* Hamburger icon (only small screens) */}
        <button
          className="md:hidden p-2 rounded-lg bg-btn hover:bg-btn/70 transition"
          onClick={onMobileMenu}
        >
          <Menu className="w-5 h-5 text-[var(--color-text-dark)]" />
        </button>

        {/* User info (responsive layout) */}
        <div className="flex flex-col overflow-hidden">
          <span className="font-semibold text-[var(--color-text-dark)] text-sm truncate">
            {user?.name || "User"}
          </span>
          <span className="text-xs text-[var(--color-light-gray)] truncate">
            {user?.email || "User@example.com"}
          </span>
        </div>
      </div>

      {/* Right side → Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-[var(--color-text-dark)] bg-btn hover:bg-btn/70 transition cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
};

export default Topbar;
