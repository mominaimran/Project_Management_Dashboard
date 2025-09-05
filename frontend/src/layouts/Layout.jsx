import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const handleCloseSidebar = () => setIsMobileOpen(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={false} />
      </div>

      {/* Sidebar (Mobile - Drawer style) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={handleCloseSidebar}
          />
          {/* Drawer Sidebar */}
          <div className="relative z-50 w-64">
            <Sidebar isCollapsed={false} onClose={handleCloseSidebar} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Topbar with controls */}
        <Topbar onMobileMenu={() => setIsMobileOpen(true)} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-bg-dark/25">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
