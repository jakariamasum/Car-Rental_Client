import { Link } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/features/cars/carsApi";
import CarCard from "../cardCard/CarCard";
export type TCar = {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  image: string;
  year: string;
  mileage: string;
  fuelType: string;
  transmission: string;
};

const Featured = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined);
  const cars: TCar[] = data?.data;
  const featured = cars?.slice(0, 6);

  if (isLoading) {
    return <p>Loading.....</p>;
  }
  return (
    <div className=" flex flex-col justify-center items-center gap-4 container mx-auto p-5">
      <h2 className="text-3xl md:text-5xl capitalize  font-semibold text-center">
        Latest <span className="text-indigo-600">Cars</span>
      </h2>
      <p className="text-center ">
        A friendly collection for you. You can have a look and choose the best
        for you.
      </p>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full mt-10">
        {featured?.map((car: TCar) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
      <Link
        to="/all-cars"
        className="px-6 rounded-md py-2 mt-2 bg-indigo-500 text-white hover:bg-black"
      >
        See more
      </Link>
    </div>
  );
};

export default Featured;
