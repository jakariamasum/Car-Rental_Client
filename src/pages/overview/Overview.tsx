/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  contact: string;
  bookingHistory: Array<{
    id: number;
    car: string;
    date: string;
    status: string;
  }>;
}

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User>({
    name: "John Doe",
    email: "johndoe@example.com",
    contact: "+1234567890",
    bookingHistory: [
      { id: 1, car: "Toyota Camry", date: "2024-09-10", status: "Pending" },
      { id: 2, car: "Honda Accord", date: "2024-09-15", status: "Approved" },
    ],
  });

  const handleUpdateProfile = () => {
    navigate("/dashboard/update-profile");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <p className="text-lg font-medium text-gray-800 mt-1">
                {user.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <p className="text-lg font-medium text-gray-800 mt-1">
                {user.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Contact
              </label>
              <p className="text-lg font-medium text-gray-800 mt-1">
                {user.contact}
              </p>
            </div>
          </div>
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Booking History
          </h3>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ul className="divide-y divide-gray-300">
              {user.bookingHistory.map((booking) => (
                <li
                  key={booking.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {booking.car}
                    </p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                  </div>
                  <span
                    className={`px-4 py-1 text-sm font-medium rounded-full ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
