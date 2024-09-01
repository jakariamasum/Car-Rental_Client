/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignupMutation } from "../redux/features/signup/signUp";

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms: boolean;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInputs>();
  const [nameFocused, setNameFocused] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] =
    useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const navigate = useNavigate();
  const [signUp] = useSignupMutation();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    if (!data.terms) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const toastId = toast.loading("Signing up...");
    try {
      console.log(data);
      const signUpData = { ...data, role: "user" };
      const res = await signUp(signUpData).unwrap();
      console.log(res);
      toast.success("Signed up successfully!", { id: toastId, duration: 2000 });
      navigate(`/login`);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="lg:mt-0 py-8 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-4 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              onFocus={() => setNameFocused(true)}
              onBlur={(e) => setNameFocused(!!e.target.value)}
              placeholder=" "
              className={`w-full px-4 py-3 border rounded-md ${
                errors.name
                  ? "border-red-500"
                  : nameFocused
                  ? "border-indigo-700"
                  : "border-gray-300"
              } focus:outline-none transition duration-300`}
            />
            <label
              htmlFor="name"
              className={`absolute left-3 text-sm text-gray-500 transition-all duration-300 transform ${
                nameFocused || errors.name
                  ? "-top-3.5 text-indigo-700 bg-white px-1"
                  : "top-3"
              }`}
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
              onFocus={() => setEmailFocused(true)}
              onBlur={(e) => setEmailFocused(!!e.target.value)}
              placeholder=" "
              className={`w-full px-4 py-3 border rounded-md ${
                errors.email
                  ? "border-red-500"
                  : emailFocused
                  ? "border-indigo-700"
                  : "border-gray-300"
              } focus:outline-none transition duration-300`}
            />
            <label
              htmlFor="email"
              className={`absolute left-3 text-sm text-gray-500 transition-all duration-300 transform ${
                emailFocused || errors.email
                  ? "-top-3.5 text-indigo-700 bg-white px-1"
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
                  ? "border-indigo-700"
                  : "border-gray-300"
              } focus:outline-none transition duration-300`}
            />
            <label
              htmlFor="password"
              className={`absolute left-3 text-sm text-gray-500 transition-all duration-300 transform ${
                passwordFocused || errors.password
                  ? "-top-3.5 text-indigo-700 bg-white px-1"
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

          <div className="relative">
            <input
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords must match",
              })}
              type="password"
              id="confirmPassword"
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={(e) => setConfirmPasswordFocused(!!e.target.value)}
              placeholder=" "
              className={`w-full px-4 py-3 border rounded-md ${
                errors.confirmPassword
                  ? "border-red-500"
                  : confirmPasswordFocused
                  ? "border-indigo-700"
                  : "border-gray-300"
              } focus:outline-none transition duration-300`}
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute left-3 text-sm text-gray-500 transition-all duration-300 transform ${
                confirmPasswordFocused || errors.confirmPassword
                  ? "-top-3.5 text-indigo-700 bg-white px-1"
                  : "top-3"
              }`}
            >
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("phone")}
              type="text"
              id="phone"
              placeholder=" "
              className={`w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none transition duration-300`}
            />
            <label
              htmlFor="phone"
              className={`absolute left-3 text-sm text-gray-500 transition-all duration-300 transform ${
                watch("phone")
                  ? "-top-3.5 text-indigo-700 bg-white px-1"
                  : "top-3"
              }`}
            >
              Phone Number (optional)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              {...register("terms", {
                required: "You must agree to the terms and conditions",
              })}
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={handleCheckboxChange}
              className="focus:ring-indigo-700 h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link
                to="/terms-and-conditions"
                className="text-indigo-700 hover:underline"
              >
                Terms and Conditions
              </Link>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`mt-4 px-4 py-2 rounded text-white ${
              termsAccepted
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!termsAccepted}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-700 hover:underline">
            Sign In Instead
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

export default Register;
