import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useGetAllCarsQuery } from "../../redux/features/cars/carsApi";
import { uploadImageToImgBB } from "../../utils/uploadImage";

export type TCar = {
  _id: string;
  name: string;
  description: string;
  color: string;
  status: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  image: string;
  year: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  isElectric: boolean;
};

const ManageCars: React.FC = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TCar>({
    defaultValues: {
      name: "",
      description: "",
      color: "",
      features: [],
      pricePerHour: Number(""),
      isDeleted: false,
      image: "",
      year: "",
      mileage: "",
      fuelType: "",
      transmission: "",
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const imageUrl = await uploadImageToImgBB(event.target.files[0]);
        console.log(imageUrl);
        setImageUrl(imageUrl);
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
  };

  const onSubmit = async (data: TCar) => {
    try {
      if (isEditing) {
        console.log("edit car", data);
      } else {
        console.log("add", data);
      }
      reset();
      setImageUrl("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleDeleteCar = async (id: string) => {
    try {
      console.log("Car deleted successfully!", id);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  if (isLoading) return <>Loading.......</>;

  const cars: TCar[] = data?.data;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Manage Cars
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {isEditing ? "Edit Car" : "Add New Car"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...(register("name"), { required: "Name is required" })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  {...register("color", { required: "Color is  required" })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.color && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.color.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  {...register("year", { required: "Year is required" })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.year.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Mileage
                </label>
                <input
                  type="text"
                  {...register("mileage", { required: "Mileage is required" })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.mileage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mileage.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Fuel Type
                </label>
                <input
                  type="text"
                  {...register("fuelType", { required: "Fuel type required" })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.fuelType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fuelType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Transmission
                </label>
                <input
                  type="text"
                  {...register("transmission", {
                    required: "Transmission required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.transmission && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.transmission.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Price per Hour
                </label>
                <input
                  type="number"
                  {...register("pricePerHour", {
                    required: "Price per hour required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.pricePerHour && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricePerHour.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  {...register("features", {
                    required: "At least one feature is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.features && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.features.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block  text-sm font-medium text-gray-600 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
                {errors.features && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.features.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Car preview"
                  className="mt-4 w-48 h-48 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                {isEditing ? "Update Car" : "Add Car"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setImageUrl("");
                    setIsEditing(false);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Price per Hour
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map((car) => (
                <tr key={car._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {car.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car.color}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {car.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${car.pricePerHour}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-2">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
