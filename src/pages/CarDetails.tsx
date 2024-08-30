import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../redux/features/cars/carsApi";

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const { data } = useGetSingleCarQuery(id as string);
  const car = data?.data;

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-stretch gap-8 mb-12">
        <div className="w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <img
              src={
                "https://revus.tm-colors.info/dealer/wp-content/uploads/revslider/rewon-home-page-slider/auto-slide-2-min.png"
              }
              alt={car?.name}
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {car?.name}
            </h1>
            <p className="text-gray-600 mb-6">{car?.description}</p>
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {car?.year}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {car?.mileage} miles
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {car?.fuelType}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {car?.transmission}
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              ${car?.pricePerHour} / hour
            </p>
            <p
              className={`text-md font-semibold ${
                car?.status === "available" ? "text-green-500" : "text-red-500"
              }`}
            >
              {car?.status === "available" ? "Available" : "Unavailable"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Features</h2>
        <ul className="list-disc list-inside space-y-3 mb-6">
          {car?.features.map((feature: string, index: string) => (
            <li key={index} className="text-gray-700">
              {feature}
            </li>
          ))}
        </ul>

        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Choose Additional Options
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Insurance", "GPS", "Child Seat"].map((option) => (
            <div
              key={option}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-300 ${
                selectedFeatures.includes(option)
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => handleFeatureToggle(option)}
            >
              <input
                type="checkbox"
                checked={selectedFeatures.includes(option)}
                onChange={() => handleFeatureToggle(option)}
                className="mr-3"
              />
              <label className="text-gray-700">{option}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Customer Reviews
        </h2>
        <p className="text-gray-600 italic">
          No reviews available for this car.
        </p>
      </div>

      <div className="text-center">
        <button className="bg-red-500 text-white text-lg font-bold px-8 py-4 rounded-lg hover:bg-purple-500 transition duration-300 shadow-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
