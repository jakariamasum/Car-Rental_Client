import React, { useState } from "react";
import CarCard from "../../components/cardCard/CarCard";
import { useGetAllCarsQuery } from "../../redux/features/cars/carsApi";
import { TCar } from "../manageCars/ManageCars";
type TType = { _id: string; type: string };

const AllCars: React.FC = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined);
  const carData: TCar[] = data?.data;
  const types = carData?.reduce<TType[]>((acc, car) => {
    if (car.fuelType && !acc.some((item) => item.type === car.fuelType)) {
      acc.push({
        _id: car._id,
        type: car.fuelType,
      });
    }
    return acc;
  }, []);

  const [carType, setCarType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(50000);

  if (isLoading) {
    return <>Loading........</>;
  }

  const filteredCars = carData.filter(
    (car: TCar) =>
      (carType === "All" ||
        car.fuelType.toLocaleLowerCase() === carType.toLocaleLowerCase()) &&
      car.pricePerHour <= priceRange
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
              {types?.map((type) => (
                <option key={type._id} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Price Range
            </label>
            <input
              type="range"
              min="10"
              max="500"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>$10</span>
              <span>${priceRange}</span>
              <span>$500</span>
            </div>
          </div>
        </aside>

        <main className="lg:w-3/4 w-full p-4">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Available Cars
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCars;
