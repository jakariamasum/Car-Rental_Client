import React from "react";
import {
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
} from "../../redux/features/booking/bookingApi";
import { toast } from "sonner";

type TBooking = {
  _id: string;
  status: string;
  startTime: string;
  totalCost: number;
  car: {
    name: string;
    image: string;
    pricePerHour: number;
  };
};

const Payment: React.FC = () => {
  const [updateBooking] = useUpdateBookingMutation();
  const { data } = useGetUserBookingsQuery(undefined);
  const approvedBooking: TBooking[] = data?.data?.filter(
    (booking: TBooking) =>
      booking.status === "approved" || booking.status === "returned"
  );

  const handlePayment = (bookingId: string, totalCost: number) => {
    console.log(
      `Processing payment for booking ${bookingId} with amount $${totalCost}`
    );
  };

  const handleReturnCar = async (bookingId: string) => {
    const data = { status: "pending" };
    const toastId = toast.loading("Loading..");
    try {
      console.log(`Requesting return for booking ${bookingId}`);
      const res = await updateBooking({ id: bookingId, data: data });
      console.log(res);
      toast.success("Request send!", { id: toastId, duration: 1000 });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 1000 });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {approvedBooking?.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
          >
            <img
              src={booking.car.image}
              alt={booking.car.name}
              className="w-full h-48 object-cover rounded-t-md mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {booking.car.name}
            </h2>

            <p className="text-gray-600 mb-4">
              <strong>Start Time:</strong>{" "}
              {new Date(booking.startTime).toLocaleString()}
            </p>
            <p className="text-lg font-semibold text-green-700 mb-4">
              Total Cost: ${booking.totalCost}
            </p>
            {booking.status === "approved" ? (
              <button
                onClick={() => handleReturnCar(booking._id)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-md hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-lg"
              >
                Request Return
              </button>
            ) : booking.status === "returned" ? (
              <button
                onClick={() => handlePayment(booking._id, booking.totalCost)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-md hover:from-green-600 hover:to-green-700 transition duration-300 shadow-lg"
              >
                Pay Now
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white font-bold py-3 rounded-md cursor-not-allowed"
              >
                Action Not Available
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
