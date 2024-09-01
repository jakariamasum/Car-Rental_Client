import React, { useState } from "react";
import { FaUndo } from "react-icons/fa";
import ConfirmAlert from "../../components/confirmalert/ConfirmAlert";
import { useGetAllBookingsQuery } from "../../redux/features/booking/bookingApi";
import { Link } from "react-router-dom";

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
  startTime: string;
};
const ManageBooking: React.FC = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);
  const [selectedId, setSelectedId] = useState<string>("");
  // console.log()

  const [showConfirm, setShowConfirm] = useState(false);

  const handleReturnCar = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmReturnCar = () => {
    setShowConfirm(false);
  };
  if (isLoading) {
    <>Loading......</>;
  }

  const cars: TBooking[] = data?.data;
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
                    {car?.startTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car?.car?.transmission}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      car?.car?.status === "available"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {car?.car?.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {car?.car?.status === "available" && (
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
