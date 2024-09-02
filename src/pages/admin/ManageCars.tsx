/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  useCreateCarsMutation,
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useUpdateCarMutation,
} from "../../redux/features/cars/carsApi";
import { uploadImageToImgBB } from "../../utils/uploadImage";
import Modal from "../../components/modal/Modal";
import { toast } from "sonner";

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
  const [createCar] = useCreateCarsMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const { data, isLoading } = useGetAllCarsQuery(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCar, setCurrentCar] = useState<TCar | null>(null);
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
      pricePerHour: 0,
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
        const uploadedUrl = await uploadImageToImgBB(event.target.files[0]);
        setImageUrl(uploadedUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const openModal = (car?: TCar) => {
    if (car) {
      setCurrentCar(car);
      setImageUrl(car.image);
      reset(car);
      setIsEditing(true);
    } else {
      resetFormState();
    }
    setIsModalOpen(true);
  };

  const resetFormState = useCallback(() => {
    setCurrentCar(null);
    setImageUrl("");
    setIsEditing(false);
    reset({
      name: "",
      description: "",
      color: "",
      features: [],
      pricePerHour: 0,
      isDeleted: false,
      image: "",
      year: "",
      mileage: "",
      fuelType: "",
      transmission: "",
    });
  }, [reset]);

  const closeModal = () => {
    setIsModalOpen(false);
    resetFormState();
  };

  useEffect(() => {
    if (!isModalOpen) {
      resetFormState();
    }
  }, [isModalOpen, resetFormState]);

  const onSubmit = async (data: TCar) => {
    try {
      const formattedData = {
        ...data,
        pricePerHour: Number(data.pricePerHour),
        features: data.features[0]
          .split(",")
          ?.map((feature) => feature.trim())
          ?.filter((feature) => feature !== ""),
        image: imageUrl,
      };
      const toastId = toast.loading("Loading");
      if (isEditing) {
        console.log("Edit car", formattedData);
        try {
          const res = await updateCar({
            id: formattedData?._id,
            data: formattedData,
          });
          console.log(res);
          toast.success("Updated", { id: toastId, duration: 1000 });
          console.log("update car", formattedData);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      } else {
        try {
          const res = await createCar(formattedData);
          console.log(res);
          toast.success("Created", { id: toastId, duration: 1000 });
          console.log("Add car", formattedData);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
      closeModal();
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleDeleteCar = async (id: string) => {
    const toastId = toast.loading("Loading");

    try {
      const res = await deleteCar(id);
      console.log(res);
      toast.success("Deleted", { id: toastId, duration: 1000 });
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

        <button
          onClick={() => openModal()}
          className="px-4 py-2 mb-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
        >
          Add New Car
        </button>

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
              {cars?.map((car) => (
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
                    <button
                      onClick={() => openModal(car)}
                      className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-2"
                    >
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

      {/* Modal for adding/editing car */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
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
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  {...register("color", { required: "Color is required" })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.year.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Price Per Hour
                </label>
                <input
                  type="number"
                  {...register("pricePerHour", {
                    required: "Price per hour is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.pricePerHour && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricePerHour.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Fuel-type
                </label>
                <input
                  type="text"
                  {...register("fuelType", {
                    required: "Fuel type is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.fuelType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fuelType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Mileage
                </label>
                <input
                  type="text"
                  {...register("mileage", {
                    required: "Mileage is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.mileage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mileage.message}
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
                    required: "Transmission is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.transmission && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.transmission.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  {...register("features", {
                    required: "Features are required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.features && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.features.message}
                  </p>
                )}
              </div>
              <div></div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Car"
                    className="mt-2 h-32 w-32 object-cover"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                {isEditing ? "Update Car" : "Add Car"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ManageCars;
