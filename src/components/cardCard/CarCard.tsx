import { HeartIcon } from "@heroicons/react/16/solid";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { IoSpeedometerOutline } from "react-icons/io5";
import { TbManualGearbox } from "react-icons/tb";
import { Link } from "react-router-dom";
import { TCar } from "../featured/Featured";

const CarCard = ({ car }: { car: TCar }) => {
  return (
    <figure className="relative w-full max-w-sm mx-auto overflow-hidden bg-[#ECEDF3] rounded-lg shadow-lg">
      <img
        src={car.image}
        alt={car.name}
        className="object-cover w-full h-48 transition duration-500 ease-in-out transform hover:scale-105"
      />

      <figcaption className="absolute inset-0 flex items-center justify-center w-full h-full text-center transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 opacity-0 hover:opacity-100">
        <button className="px-4 py-2 font-semibold text-white bg-white bg-opacity-25 rounded">
          SEE DETAILS
        </button>
      </figcaption>

      <div className="w-full border-x-[1px] bg-lightMain border-b-[1px] border-[#e4e4e4] p-2 rounded-b-[20px] relative">
        <h3 className="mt-3 w-full px-3 text-xl text-black font-semibold border-b-[1px] pb-2 border-[#e4e4e4]">
          {car?.name}
        </h3>
        <div className="p-3 w-full flex justify-between items-center border-b-[1px] border-[#e4e4e4]">
          <div className="flex flex-col justify-center items-center gap-1">
            <IoSpeedometerOutline className="text-xl text-lightBlack" />
            <p className="text-lightBlack font-medium text-[14px]">
              {car.mileage} km
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <BsFuelPumpDiesel className="text-xl text-lightBlack" />
            <p className="text-lightBlack capitalize font-medium text-[14px]">
              {car?.fuelType}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <TbManualGearbox className="text-xl text-lightBlack" />
            <p className="text-lightBlack font-medium text-[14px]">
              {car?.transmission}
            </p>
          </div>
        </div>
        <div className="p-3 w-full flex justify-between items-center">
          <p className="text-xl font-bold text-black">${car?.pricePerHour}</p>
          <Link to={`/details/${car?._id}`}>
            <button className="text-sub font-semibold text-[18px] hover:text-red-500 duration-500 flex justify-center items-center gap-1">
              See Details <GoArrowUpRight />
            </button>
          </Link>
        </div>
      </div>

      <button className="absolute top-3 right-3 text-white">
        <HeartIcon className="size-7 text-white hover:text-red-500" />
      </button>
    </figure>
  );
};

export default CarCard;
