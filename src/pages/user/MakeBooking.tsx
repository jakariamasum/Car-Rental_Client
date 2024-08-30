import React, { useEffect, useState } from "react";
import { useGetAllCarsQuery } from "../../redux/features/cars/carsApi";
import { TCar } from "../admin/ManageCars";

interface Car {
  _id: number;
  name: string;
  image: string;
  pricePerHour: number;
  description: string;
}

interface BookingDetails {
  NID: string;
  passport: string;
  drivingLicense: string;
  paymentInfo: string;
  additionalOptions: string[];
}

const MakeBooking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    NID: "",
    passport: "",
    drivingLicense: "",
    paymentInfo: "",
    additionalOptions: [],
  });

  const [isConfirmation, setIsConfirmation] = useState<boolean>(false);
  const { data } = useGetAllCarsQuery(undefined);

  useEffect(() => {
    if (data && data.data) {
      let filteredCars = [];

      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredCars = data.data.filter(
          (car: TCar) =>
            car.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            car.description.toLowerCase().includes(lowerCaseSearchTerm) ||
            car.pricePerHour.toString().includes(lowerCaseSearchTerm)
        );
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

  const handleBookingSubmit = () => {
    setIsConfirmation(true);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {searchResults.map((car) => (
            <div
              key={car._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{car.name}</h3>
              <p className="text-gray-700 mb-2">{car.description}</p>
              <p className="text-lg font-semibold mb-4">
                ${car.pricePerHour} / hour
              </p>
              <button
                onClick={() => handleSelectCar(car)}
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedCar && !isConfirmation && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Car Details</h2>
          <div className="flex flex-col md:flex-row">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-full md:w-1/2 h-auto object-cover rounded-md mb-4 md:mb-0 md:mr-4"
            />
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold mb-2">{selectedCar.name}</h3>
              <p className="text-gray-700 mb-4">{selectedCar.description}</p>
              <p className="text-lg font-semibold mb-4">
                ${selectedCar.pricePerHour} / hour
              </p>
              <h4 className="text-lg font-bold mb-2">Additional Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <h4 className="text-lg font-bold mb-2">Booking Form</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="NID"
                  value={bookingDetails.NID}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      NID: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Driving License"
                  value={bookingDetails.drivingLicense}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      drivingLicense: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Payment Information"
                  value={bookingDetails.paymentInfo}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      paymentInfo: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleBookingSubmit}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmation && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
          <p className="text-gray-700 mb-4">
            Thank you for your booking. Please review your details below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <p>
              <strong>Car:</strong> {selectedCar?.name}
            </p>
            <p>
              <strong>Price per hour:</strong> ${selectedCar?.pricePerHour}
            </p>
            <p>
              <strong>NID:</strong> {bookingDetails.NID}
            </p>
            <p>
              <strong>Passport:</strong> {bookingDetails.passport}
            </p>
            <p>
              <strong>Driving License:</strong> {bookingDetails.drivingLicense}
            </p>
            <p>
              <strong>Payment Information:</strong> {bookingDetails.paymentInfo}
            </p>
            <p>
              <strong>Additional Options:</strong>{" "}
              {bookingDetails.additionalOptions.join(", ")}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCar(null);
              setIsConfirmation(false);
              setBookingDetails({
                NID: "",
                passport: "",
                drivingLicense: "",
                paymentInfo: "",
                additionalOptions: [],
              });
              setSearchResults([]);
            }}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Make Another Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default MakeBooking;
