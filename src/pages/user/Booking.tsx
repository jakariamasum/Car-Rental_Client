import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaClock } from "react-icons/fa";

interface Booking {
  id: number;
  carName: string;
  date: string;
  status: string;
}

const bookings: Booking[] = [
  { id: 1, carName: "Toyota Camry", date: "2024-09-10", status: "pending" },
  { id: 2, carName: "Honda Accord", date: "2024-08-15", status: "approved" },
  { id: 3, carName: "Ford Mustang", date: "2024-08-20", status: "completed" },
  { id: 4, carName: "Ford Mustang", date: "2024-08-20", status: "pending" },
  { id: 5, carName: "Ford Mustang", date: "2024-08-20", status: "approved" },
];

const Booking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "pending" | "approved" | "completed"
  >("pending");

  const filteredBookings = bookings.filter(
    (booking) => booking.status === activeTab
  );

  const handleModify = (id: number) => {
    console.log("Modify booking:", id);
  };

  const handleCancel = (id: number) => {
    console.log("Cancel booking:", id);
  };

  return (
    <div className="p-3 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 border-b-2 border-gray-200 pb-4">
          Booking Management
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
          {["pending", "approved", "completed"].map((status) => (
            <button
              key={status}
              onClick={() =>
                setActiveTab(status as "pending" | "approved" | "completed")
              }
              className={`px-3 lg:px-6 w-fit py-2 rounded-lg font-semibold transition duration-300 focus:outline-none ${
                activeTab === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-blue-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className={`flex justify-between items-center p-5 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
                booking.status === "approved"
                  ? "bg-green-50 border-l-8 border-green-400"
                  : booking.status === "completed"
                  ? "bg-gray-50 border-l-8 border-gray-400"
                  : "bg-yellow-50 border-l-8 border-yellow-400"
              }`}
            >
              <div>
                <p className="text-xl font-semibold text-gray-900">
                  {booking.carName}
                </p>
                <p className="text-sm text-gray-500">{booking.date}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : booking.status === "completed"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {booking.status === "approved" ? (
                  <FaCheckCircle className="text-green-500 text-2xl" />
                ) : booking.status === "completed" ? (
                  <FaClock className="text-gray-500 text-2xl" />
                ) : (
                  <>
                    <button
                      onClick={() => handleModify(booking.id)}
                      className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
