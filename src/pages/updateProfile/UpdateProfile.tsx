import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface UpdateProfileInputs {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const UpdateProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInputs>();

  const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
    console.log("Profile updated:", data);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              placeholder=" "
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
            <label
              htmlFor="name"
              className="absolute top-3 left-3 text-sm text-gray-600 transition-all duration-300 transform -translate-y-2 scale-75 origin-top-left"
            >
              Name
            </label>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              placeholder=" "
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
            <label
              htmlFor="email"
              className="absolute top-3 left-3 text-sm text-gray-600 transition-all duration-300 transform -translate-y-2 scale-75 origin-top-left"
            >
              Email Address
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder=" "
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
            <label
              htmlFor="password"
              className="absolute top-3 left-3 text-sm text-gray-600 transition-all duration-300 transform -translate-y-2 scale-75 origin-top-left"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("phone")}
              type="text"
              id="phone"
              placeholder=" "
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
            <label
              htmlFor="phone"
              className="absolute top-3 left-3 text-sm text-gray-600 transition-all duration-300 transform -translate-y-2 scale-75 origin-top-left"
            >
              Phone Number
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
