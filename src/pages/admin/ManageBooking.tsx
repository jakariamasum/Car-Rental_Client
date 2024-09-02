import React, { useState } from "react";
import { FaUndo } from "react-icons/fa";
import ConfirmAlert from "../../components/confirmalert/ConfirmAlert";
import { useGetAllBookingsQuery } from "../../redux/features/booking/bookingApi";
import { Link } from "react-router-dom";
import { useReturnCarMutation } from "../../redux/features/cars/carsApi";
import moment from "moment";
import { toast } from "sonner";
type TBooking = {
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  car: {
    _id: string;
    name: string;
    fuelType: string;
  };
  date: string;
  status: string;
};
const ManageBooking: React.FC = () => {
  const [returnCar] = useReturnCarMutation();
  const { data, isLoading } = useGetAllBookingsQuery(undefined);
  const [selectedId, setSelectedId] = useState<string>("");
  // console.log()

  const [showConfirm, setShowConfirm] = useState(false);

  const handleReturnCar = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmReturnCar = async () => {
    const data = {
      endTime: moment(new Date()).utc().format("HH:mm"),
    };
    const toastId = toast.loading("Loading...");
    try {
      const res = await returnCar({ id: selectedId, data: data });
      console.log(res);
      toast.success("Successfully Return", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
    setShowConfirm(false);
  };
  if (isLoading) {
    <>Loading......</>;
  }

  const cars: TBooking[] = data?.data?.filter(
    (booking: TBooking) =>
      booking.status === "approved" || booking.status === "returned"
  );
  console.log(cars);
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Manage Booked Cars
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Car Model
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Type
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
              {cars?.map((car) => (
                <tr key={car?._id} className="hover:bg-gray-50">
                  <Link to={`/details/${car?.car._id}`}>
                    <td
                      title="See Details"
                      className="hover:underline px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {car?.car?.name}
                    </td>
                  </Link>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car?.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(car?.date).format("MMMM Do YYYY")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car?.car?.fuelType}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      car?.status === "approved"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {car?.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {car?.status === "approved" && (
                      <button
                        onClick={() => handleReturnCar(car._id)}
                        className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <FaUndo />
                      </button>
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
          title="Confirm Return"
          message="Are you sure you want to mark this car as returned?"
          onConfirm={confirmReturnCar}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default ManageBooking;
