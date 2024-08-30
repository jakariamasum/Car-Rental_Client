import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";

export interface UpdateProfileInputs {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const UpdateProfile: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetSingleUserQuery(user?.email);
  const { register, handleSubmit, setValue } = useForm<UpdateProfileInputs>({
    defaultValues: {
      name: data?.data?.name,
      email: data?.data?.email,
      phone: data?.data?.phone,
    },
  });
  const [updateProfile] = useUpdateUserMutation();
  useEffect(() => {
    if (data && data.data) {
      setValue("name", data.data.name || "");
      setValue("email", data.data.email || "");
      setValue("phone", data.data.phone || "");
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<UpdateProfileInputs> = async (formData) => {
    console.log("Profile updated:", formData);
    try {
      const response = await updateProfile({
        id: user?.email as string,
        data: formData,
      }).unwrap();
      console.log(response);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Profile updated failed!");
      console.log(error);
    }
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
              {...register("name")}
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
              readOnly
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 bg-gray-100"
            />
            <label
              htmlFor="email"
              className="absolute top-3 left-3 text-sm text-gray-600 transition-all duration-300 transform -translate-y-2 scale-75 origin-top-left"
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              {...register("password")}
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
