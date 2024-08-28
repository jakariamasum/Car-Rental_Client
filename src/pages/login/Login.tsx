/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
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
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.token) as TUser;
      dispatch(setUser({ user: user, token: res.token }));
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      navigate(`/dashboard`);
    } catch (err) {
      toast.error("Incorrect email or password. Please try again.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-4 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              onFocus={() => setEmailFocused(true)}
              onBlur={(e) => setEmailFocused(!!e.target.value)}
              placeholder=" "
              className={`w-full px-4 py-3 border rounded-md ${
                errors.email
                  ? "border-red-500"
                  : emailFocused
                  ? "border-purple-500"
                  : "border-gray-300"
              } focus:outline-none transition duration-300`}
            />
            <label
              htmlFor="email"
              className={`absolute left-3 text-sm text-gray-500 transition-all duration-300 transform ${
                emailFocused || errors.email
                  ? "-top-3.5 text-purple-500 bg-white px-1"
                  : "top-3"
              }`}
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
              onFocus={() => setPasswordFocused(true)}
              onBlur={(e) => setPasswordFocused(!!e.target.value)}
              placeholder=" "
              className={`w-full px-4 py-3 border rounded-md ${
                errors.password
                  ? "border-red-500"
                  : passwordFocused
                  ? "border-purple-500"
                  : "border-gray-300"
              } focus:outline-none transition duration-300`}
            />
            <label
              htmlFor="password"
              className={`absolute left-3 text-sm text-gray-500 transition-all duration-300 transform ${
                passwordFocused || errors.password
                  ? "-top-3.5 text-purple-500 bg-white px-1"
                  : "top-3"
              }`}
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-purple-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>

        <p className="text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-500 hover:underline">
            Sign Up Instead
          </Link>
        </p>

        <div className="flex justify-center mt-6 text-sm text-gray-600">
          <Link to="/privacy-policy" className="mr-4 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
