import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

const UserDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto mt-12 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
