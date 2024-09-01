import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {
  useConfirmBookingMutation,
  useGetAllBookingsQuery,
} from "../../redux/features/booking/bookingApi";
import ConfirmAlert from "../../components/confirmalert/ConfirmAlert";
import { toast } from "sonner";

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
  status: string;
  createdAt: string;
};

const AllBookings: React.FC = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);
  const [confirmBooking] = useConfirmBookingMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleCancel = (booking: TBooking) => {
    setMessage("Are you sure you want to cancel this booking?");
    setSelectedBooking(booking);
    setStatus("canceled");
    setShowConfirm(true);
  };

  const handleApprove = (booking: TBooking) => {
    setMessage("Are you sure you want to approve this booking?");
    setStatus("approved");
    setSelectedBooking(booking);
    setShowConfirm(true);
  };

  const confirmReturnCar = async () => {
    if (selectedBooking) {
      try {
        const res = await confirmBooking({
          id: selectedBooking?._id,
          data: { status },
        });
        console.log(res);
        toast.success(`${status} successfully!`);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      setShowConfirm(false);
      setSelectedBooking(null);
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
                    {booking.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(booking)}
                          className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => handleCancel(booking)}
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
