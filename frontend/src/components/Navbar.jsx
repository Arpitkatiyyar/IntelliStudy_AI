// import { useAuth } from "../context/AuthContext.jsx";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <div className="flex justify-between items-center bg-white shadow p-4"
//     >
//       <h2 className="text-xl font-bold">
//         Welcome,
//         {user?.name}
//       </h2>

//       <button
//         onClick={logout}
//         className="bg-red-500 text-white px-4 py-2 rounded "
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Welcome, {user?.name}  </h2>
        {/* <p className="text-gray-500">{user?.name}</p> */}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
