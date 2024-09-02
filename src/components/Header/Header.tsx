import { MoonIcon, SunIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../../public/logo.jpg";
const Header = () => {
  const user = useAppSelector(useCurrentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleLinkClick = () => {
    setMenuOpen(false);
  };
  console.log(theme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "dark" : "light"
    );
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="RideX Rentals" className="size-14 " />
        </Link>
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
              ? "text-indigo-700 block py-2"
              : "hover:text-indigo-700 block py-2"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-700 block py-2"
              : "hover:text-indigo-700 block py-2"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/all-cars"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-700 block py-2"
              : "hover:text-indigo-700 block py-2"
          }
        >
          All Cars
        </NavLink>
        <NavLink
          to="/book-car"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-700 block py-2"
              : "hover:text-indigo-700 block py-2"
          }
        >
          Booking
        </NavLink>
        <NavLink
          to="/contact-us"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            isActive
              ? "text-indigo-700 block py-2"
              : "hover:text-indigo-700 block py-2"
          }
        >
          Contact
        </NavLink>
        {/* Theme Switcher Icon */}
        <button
          onClick={toggleTheme}
          className=" p-2 text-gray-700 z-50"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </button>

        {!user && (
          <NavLink
            to="/login"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-700 flex gap-1 py-2"
                : "hover:text-indigo-700 flex gap-1 py-2"
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
