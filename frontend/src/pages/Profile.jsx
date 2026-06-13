import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <p className="text-gray-500">Manage your account details</p>
          </div>
        </div>

        <div className="mt-6 border-t pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Name</span>
            <span className="text-gray-900">{user?.name || "N/A"}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Email</span>
            <span className="text-gray-900">{user?.email || "N/A"}</span>
          </div>
        </div>

        {/* <div className="mt-8 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div> */}
      </div>
    </DashboardLayout>
  );
}
