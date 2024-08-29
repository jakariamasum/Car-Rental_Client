import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useGetAllBookingsQuery } from "../../redux/features/booking/bookingApi";
import ConfirmAlert from "../../components/confirmalert/ConfirmAlert";

type TBooking = {
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  car: {
    name: string;
    _id: string;
    status: string;
    transmission: string;
  };
  createdAt: string;
};

const AllBookings: React.FC = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);

  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const handleCancel = (id: string) => {
    setMessage("Are you sure you want to cancel this booking?");
    setSelectedBookingId(id);
    setShowConfirm(true);
  };

  const handleApprove = (id: string) => {
    setMessage("Are you sure you want to approve this booking?");
    setSelectedBookingId(id);
    setShowConfirm(true);
  };

  const confirmReturnCar = () => {
    if (selectedBookingId) {
      console.log(`Action confirmed for booking ID: ${selectedBookingId}`);
      setShowConfirm(false);
      setSelectedBookingId(null);
    }
  };

  if (isLoading) {
    return <>Loading......</>;
  }

  const bookings: TBooking[] = data?.data || [];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-8">
        <div className="mb-8 p-4 bg-blue-50 rounded-lg shadow-md">
          <h3 className="text-lg  sm:text-xl font-semibold text-blue-800 mb-2">
            Total Bookings
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {bookings.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Car Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Booking Date
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
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.car.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {booking.car.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {booking.car.status === "available" && (
                      <>
                        <button
                          onClick={() => handleApprove(booking._id)}
                          className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirm && (
        <ConfirmAlert
          title="Confirm"
          message={message}
          onConfirm={confirmReturnCar}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default AllBookings;
