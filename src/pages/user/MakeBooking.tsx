import React, { useEffect, useState } from "react";
import { useGetAllCarsQuery } from "../../redux/features/cars/carsApi";
import { TCar } from "../admin/ManageCars";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Car {
  _id: string;
  name: string;
  image: string;
  pricePerHour: number;
  description: string;
  status: string;
}

interface BookingDetails {
  NID: string;
  passport: string;
  drivingLicense: string;
  additionalOptions: string[];
}

const MakeBooking: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    NID: "",
    passport: "",
    drivingLicense: "",
    additionalOptions: [],
  });
  const navigate = useNavigate();
  const [isConfirmation, setIsConfirmation] = useState<boolean>(false);
  const { data } = useGetAllCarsQuery(undefined);
  console.log(data?.data);

  useEffect(() => {
    if (data && data.data) {
      let filteredCars = [];

      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredCars = data.data.filter((car: TCar) => {
          // Ensure that car properties are defined before using them
          const carName = car.name?.toLowerCase() || "";
          const carDescription = car.description?.toLowerCase() || "";
          const carPrice = car.pricePerHour?.toString() || "";

          return (
            carName.includes(lowerCaseSearchTerm) ||
            carDescription.includes(lowerCaseSearchTerm) ||
            carPrice.includes(lowerCaseSearchTerm)
          );
        });
      }

      setSearchResults(filteredCars);
    } else {
      setSearchResults([]);
    }
  }, [data, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  const [booking] = useCreateBookingMutation();
  const handlePreview = () => {
    setIsConfirmation(true);
  };
  const handleBookingSubmit = async () => {
    try {
      const bookingData = {
        user: user!.id,
        car: selectedCar!._id,
        date: new Date(),
      };
      const res = await booking(bookingData);
      console.log(res);
      toast.success("Successfully booked");
      navigate("/user/booking");
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!selectedCar && !isConfirmation && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Search for a Car</h2>
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, price, or details..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {searchResults.length > 0 && !selectedCar && !isConfirmation && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 md:p-8">
          {searchResults.map((car) => (
            <div
              key={car._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-t-md mb-4"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {car.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{car.description}</p>
                  <p className="text-lg font-semibold text-green-700 mb-4">
                    ${car.pricePerHour} / hour
                  </p>
                </div>
                <button
                  onClick={() => handleSelectCar(car)}
                  className="mt-4 bg-indigo-600  text-white font-bold px-4 py-2 rounded-md transition duration-300 shadow-lg hover:bg-indigo-500"
                >
                  See details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCar && !isConfirmation && (
        <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 border border-gray-100 transform transition-transform duration-500  hover:shadow-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Car Details
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-full md:w-1/2 h-auto object-cover rounded-lg mb-6 md:mb-0 md:mr-8 shadow-lg"
            />
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {selectedCar.name}
              </h3>
              <p className="text-gray-600 mb-4">{selectedCar.description}</p>
              <p className="text-xl font-semibold text-indigo-600 mb-6">
                ${selectedCar.pricePerHour} / hour
              </p>
              <h4 className="text-lg font-bold mb-3 text-gray-800">
                Additional Options
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {["Insurance", "GPS", "Child Seat"].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={bookingDetails.additionalOptions.includes(
                        option
                      )}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setBookingDetails((prevDetails) => ({
                          ...prevDetails,
                          additionalOptions: checked
                            ? [...prevDetails.additionalOptions, value]
                            : prevDetails.additionalOptions.filter(
                                (opt) => opt !== value
                              ),
                        }));
                      }}
                      className="mr-2 accent-indigo-600"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <h4 className="text-lg font-bold mb-3 text-gray-800">
                Booking Form
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="NID"
                  value={bookingDetails.NID}
                  required
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      NID: e.target.value,
                    })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Passport"
                  value={bookingDetails.passport}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      passport: e.target.value,
                    })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Driving License"
                  value={bookingDetails.drivingLicense}
                  required
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      drivingLicense: e.target.value,
                    })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handlePreview}
                disabled={!bookingDetails.NID || !bookingDetails.drivingLicense}
                className={`w-full px-4 py-3 rounded-lg text-white font-bold shadow-md transition-all duration-300 ease-in-out transform ${
                  bookingDetails.NID && bookingDetails.drivingLicense
                    ? "bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-lg"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Preview Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmation && (
        <div className="bg-white p-10 rounded-2xl shadow-2xl mb-10 border border-gray-200 transform transition-transform duration-500 hover:scale-105 hover:shadow-3xl">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center tracking-wider">
            Booking Confirmation
          </h2>
          <p className="text-lg text-gray-500 mb-8 text-center italic">
            Please review your details below.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-inner mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <p className="text-lg text-gray-900">
                <strong className="font-semibold">Car:</strong>{" "}
                {selectedCar?.name}
              </p>
              <p className="text-lg text-gray-900">
                <strong className="font-semibold">Price per hour:</strong> $
                {selectedCar?.pricePerHour}
              </p>
              <p className="text-lg text-gray-900">
                <strong className="font-semibold">NID:</strong>{" "}
                {bookingDetails.NID}
              </p>
              <p className="text-lg text-gray-900">
                <strong className="font-semibold">Passport:</strong>{" "}
                {bookingDetails.passport}
              </p>
              <p className="text-lg text-gray-900">
                <strong className="font-semibold">Driving License:</strong>{" "}
                {bookingDetails.drivingLicense}
              </p>
              <p className="text-lg text-gray-900">
                <strong className="font-semibold">Additional Options:</strong>{" "}
                {bookingDetails.additionalOptions.join(", ")}
              </p>
            </div>
          </div>
          <button
            onClick={handleBookingSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default MakeBooking;
