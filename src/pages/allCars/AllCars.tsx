import React, { useState } from "react";
import CarCard from "../../components/cardCard/CarCard";

interface Car {
  id: number;
  image: string;
  name: string;
  year: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  price: number;
}

const carData: Car[] = [
  {
    id: 1,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Peugeot 508 Sports",
    year: "2019",
    mileage: "2000",
    fuelType: "Petrol+CNG",
    transmission: "Manual",
    price: 44,
  },
  {
    id: 2,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Toyota Corolla",
    year: "2021",
    mileage: "1500",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: 50,
  },
  {
    id: 3,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Honda Civic",
    year: "2020",
    mileage: "1800",
    fuelType: "Petrol",
    transmission: "Manual",
    price: 48,
  },
  {
    id: 4,
    image:
      "https://i.ibb.co/PtPmWcD/photo-1519641471654-76ce0107ad1b-w-500-auto-format-fit-crop-q-60-ixlib-rb-4-0.jpg",
    name: "Space X",
    year: "2020",
    mileage: "1800",
    fuelType: "Petrol",
    transmission: "Manual",
    price: 48,
  },
];

const AllCars: React.FC = () => {
  const [carType, setCarType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(50000);

  const filteredCars = carData.filter(
    (car) =>
      (carType === "All" ||
        car.fuelType.toLocaleLowerCase() === carType.toLocaleLowerCase()) &&
      car.price <= priceRange
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto flex flex-col lg:flex-row">
        <aside className="lg:w-1/4 w-full p-6 bg-white shadow-lg rounded-lg mb-6 lg:mb-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Filters</h2>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Car Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Petrol">Petrol</option>
              <option value="CNG">CNG</option>
              <option value="Gas">Gas</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Price Range
            </label>
            <input
              type="range"
              min="10000"
              max="50000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>$10,000</span>
              <span>${priceRange}</span>
              <span>$50,000</span>
            </div>
          </div>
        </aside>

        <main className="lg:w-3/4 w-full p-4">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Available Cars
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCars;
