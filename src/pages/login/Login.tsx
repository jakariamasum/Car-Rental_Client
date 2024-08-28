/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.token) as TUser;
      dispatch(setUser({ user: user, token: res.token }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>

        <div className="flex flex-col space-y-3 mb-6">
          <button className="flex items-center justify-center w-full py-2 px-4 bg-purple-600 text-white rounded-md transition">
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-white px-3 text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              onFocus={() => setEmailFocused(true)}
              onBlur={(e) => setEmailFocused(!!e.target.value)}
              className={`w-full px-4 py-3 border-b-2 text-lg bg-transparent ${
                emailFocused || !!errors.email
                  ? "border-purple-500"
                  : "border-gray-300"
              } focus:outline-none transition duration-300 ease-in-out`}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 text-lg font-medium transition-all duration-300 ${
                emailFocused || !!errors.email
                  ? "-top-3 text-sm text-purple-500"
                  : "top-3 text-gray-500"
              }`}
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">Email is required</p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              onFocus={() => setPasswordFocused(true)}
              onBlur={(e) => setPasswordFocused(!!e.target.value)}
              className={`w-full px-4 py-3 border-b-2 text-lg bg-transparent ${
                passwordFocused || !!errors.password
                  ? "border-purple-500"
                  : "border-gray-300"
              } focus:outline-none transition duration-300 ease-in-out`}
            />
            <label
              htmlFor="password"
              className={`absolute left-4 text-lg font-medium transition-all duration-300 ${
                passwordFocused || !!errors.password
                  ? "-top-3 text-sm text-purple-500"
                  : "top-3 text-gray-500"
              }`}
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-purple-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
