import { UserCircleIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const Header = () => {
  const user = useAppSelector(useCurrentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative">
      <div className="flex items-center">
        {/* Brand Logo */}
        {/* <img
          src={}
          alt="RideX Rentals"
          className="h-8 w-auto"
        /> */}
        <span className="ml-3 text-lg font-bold">RideX</span>
        <span className="text-sm ml-1">CAR RENTALS</span>
      </div>

      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row items-center lg:space-x-8 absolute lg:static bg-white top-16 left-0 right-0 w-full lg:w-auto shadow-md lg:shadow-none py-4 lg:py-0 z-10 lg:z-auto`}
      >
        <NavLink
          to="/"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive
              ? "text-red-500 block py-2"
              : "hover:text-red-500 block py-2"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive
              ? "text-red-500 block py-2"
              : "hover:text-red-500 block py-2"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/all-cars"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive
              ? "text-red-500 block py-2"
              : "hover:text-red-500 block py-2"
          }
        >
          All Cars
        </NavLink>

        {!user && (
          <NavLink
            to="/login"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-red-500 flex gap-1  py-2"
                : "hover:text-red-500 flex gap-1  py-2"
            }
          >
            <UserCircleIcon className="h-6 w-6 text-black mr-1" />
            LOGIN
          </NavLink>
        )}
      </nav>

      <div className="hidden lg:flex items-center text-sm">
        <div className="flex flex-col items-center">
          <span className="font-medium">Call Us Today!</span>
          <span className="ml-2 font-bold text-xl">+88 0145 8549</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
