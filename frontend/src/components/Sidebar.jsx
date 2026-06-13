import { NavLink } from "react-router-dom";
import { FaHome, FaBookOpen, FaHistory, FaUser } from "react-icons/fa";

export default function Sidebar() {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800"}`;

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">IntelliStudy AI</h1>
        <p className="text-sm text-slate-400 mt-1">AI Study Assistant</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" className={navClass}>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/study" className={navClass}>
          <FaBookOpen />
          <span>Study</span>
        </NavLink>

        <NavLink to="/history" className={navClass}>
          <FaHistory />
          <span>History</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <FaUser />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
