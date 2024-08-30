/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
import { useGetUserBookingsQuery } from "../../redux/features/booking/bookingApi";

type TUser = {
  name: string;
  email: string;
  phone?: string;
  _id: string;
};

type TBooking = {
  _id: string;
  date: string;
  car: {
    name: string;
  };
  status: string;
};

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(useCurrentUser);
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery(
    currentUser?.email
  );
  const { data: bookingData, isLoading: bookingLoading } =
    useGetUserBookingsQuery(undefined);

  if (userLoading || bookingLoading) {
    return <>Loading.......</>;
  }
  const user: TUser = userData?.data;
  const bookings: TBooking[] = bookingData?.data;

  const handleUpdateProfile = () => {
    navigate("/user/update-profile");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h3>
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img
                src={
                  "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                }
                alt={user?.name}
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg font-medium text-gray-800 mt-2">
                {user?.name}
              </p>
              <p className="text-sm font-medium text-gray-600 mt-1">
                {user?.email}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {user?.phone || "No phone available"}
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
              {bookings?.map((booking) => (
                <li
                  key={booking._id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {booking.car.name}
                    </p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                  </div>
                  <span
                    className={`px-4 py-1 text-sm font-medium rounded-full ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "approved"
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
