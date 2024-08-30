import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import {
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
} from "../../redux/features/booking/bookingApi";
import { toast } from "sonner";

type TBooking = {
  _id: string;
  date: string;
  startTime: string;
  car: {
    name: string;
  };
  status: string;
};

const Booking: React.FC = () => {
  const { data: bookingData, isLoading: bookingLoading } =
    useGetUserBookingsQuery(undefined);

  const [activeTab, setActiveTab] = useState<string>("pending");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
  const [editBookingDate, setEditBookingDate] = useState<string>("");
  const [editBookTime, setEditBookTime] = useState<string>("");

  const bookings: TBooking[] = bookingData?.data || [];

  const filteredBookings = bookings.filter(
    (booking) => booking.status === activeTab
  );

  const handleModify = (booking: TBooking) => {
    setSelectedBooking(booking);
    setEditBookingDate(booking.date);
    setEditBookTime(booking.startTime);
    setIsModalOpen(true);
  };

  const handleCancel = (id: string) => {
    console.log("Cancel booking:", id);
  };
  const [updateBooking] = useUpdateBookingMutation();

  const handleSaveChanges = async () => {
    if (selectedBooking) {
      try {
        const updateData = {
          startTime: editBookTime,
          date: editBookingDate,
        };
        console.log(selectedBooking._id);
        const res = await updateBooking({
          id: selectedBooking._id,
          data: updateData,
        });
        console.log(res);
        toast.success("Updated!!!!");
      } catch (error) {
        console.log(error);
        toast.error("Failed");
      }
      setIsModalOpen(false);
      setSelectedBooking(null);
    }
  };

  if (bookingLoading) {
    return <>Loading.......</>;
  }

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
              onClick={() => setActiveTab(status)}
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
              key={booking._id}
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
                  {booking.car.name}
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
                      onClick={() => handleModify(booking)}
                      className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
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

      {/* Modal for editing booking details */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Edit Booking</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Booking Date
              </label>
              <input
                type="date"
                value={editBookingDate}
                onChange={(e) => setEditBookingDate(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Booking Time
              </label>
              <input
                type="time"
                value={editBookTime}
                onChange={(e) => setEditBookTime(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
