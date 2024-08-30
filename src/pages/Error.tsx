import React from "react";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  message?: string;
}

const Error: React.FC<ErrorPageProps> = ({
  message = "The page you're looking for doesn't exist.",
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Oops! Something went wrong.
      </h2>
      <p className="text-lg text-gray-600 mb-2">{message}</p>
      <img src="/error_photo.svg" alt="error_photo" className="h-96 w-96" />

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <FaHome className="mr-2" />
          Home
        </button>
        <button
          onClick={() => handleNavigation("/login")}
          className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <FaSignInAlt className="mr-2" />
          Login
        </button>
      </div>
    </div>
  );
};

export default Error;
