import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Sidebar />

      <div className="ml-22 min-h-screen bg-slate-50">
        <Navbar />

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
