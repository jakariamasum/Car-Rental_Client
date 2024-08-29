import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logOut } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    toast.warning("See you late!");
    navigate("/");
  };
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link
            to="/dashboard/overview"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Overview
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/booking"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Booking Management
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/payment"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Payment Management
          </Link>
        </li>
        <li className="mb-4">
          <div
            onClick={handleLogout}
            className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
