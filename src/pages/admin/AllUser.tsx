import React, { useState } from "react";
import { FaEdit, FaPlus, FaUser } from "react-icons/fa";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import ConfirmAlert from "../../components/confirmalert/ConfirmAlert";
import { GoBlocked } from "react-icons/go";
import { toast } from "sonner";
import { PiUserCheck } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";

type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: string;
};

const AllUser: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleAddUser = () => {
    console.log("Add new user");
  };

  const handleEditUser = (id: string) => {
    setConfirmTitle("Confirm to edit");
    setConfirmMessage("Are you sure you want to edit this user?");
    setConfirmAction(() => () => {
      console.log("Edit user:", id);
      setShowConfirm(false);
    });
    setShowConfirm(true);
  };

  const handleActiveOrBlockUser = async (user: TUser) => {
    const status = user?.status === "active" ? "block" : "active";
    setConfirmTitle(`Confirm to ${status}`);
    setConfirmMessage(`Are you sure you want to ${status} this user?`);
    const data = { status };
    setConfirmAction(() => async () => {
      console.log("Edit user:", user._id);
      try {
        const res = await updateUser({ id: user.email, data: data });
        toast.success(`User ${status}`);
        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      setShowConfirm(false);
    });
    setShowConfirm(true);
  };

  const handleChangeRole = (user: TUser) => {
    setConfirmTitle("Confirm to change role?");
    const role = user?.role === "admin" ? "user" : "admin";
    const data = { role };
    setConfirmMessage(`Are you sure you want to make ${role}?`);
    setConfirmAction(() => async () => {
      try {
        const res = await updateUser({ id: user.email, data: data });
        toast.success(`Role changed`);
        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      setShowConfirm(false);
    });
    setShowConfirm(true);
  };

  if (isLoading) {
    return <>Loading.....</>;
  }

  const users: TUser[] = data?.data;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            User Management
          </h2>
          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none"
          >
            <FaPlus />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-50 ${
                    user.status === "block" ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleActiveOrBlockUser(user)}
                      className={`${
                        user.status === "active"
                          ? "text-yellow-500 bg-yellow-100"
                          : "bg-green-100 text-green-500"
                      } hover:text-blue-700  p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-2`}
                    >
                      {user.status === "active" ? (
                        <GoBlocked />
                      ) : (
                        <PiUserCheck />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditUser(user._id)}
                      className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleChangeRole(user)}
                      className=" bg-red-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      {user.role !== "admin" ? <GrUserAdmin /> : <FaUser />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirm && (
        <ConfirmAlert
          title={confirmTitle}
          message={confirmMessage}
          onConfirm={confirmAction}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default AllUser;
