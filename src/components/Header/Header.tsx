import { UserCircleIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center">
        {/* <img
          src={}
          alt="RideX Rentals"
          className="h-8 w-auto"
        /> */}
        <span className="ml-3 text-lg font-bold">RideX</span>
        <span className="text-sm ml-1">CAR RENTALS</span>
      </div>

      <nav className="flex space-x-8 text-sm font-medium text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-500 " : "hover:text-red-500"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-red-500 " : "hover:text-red-500"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "hover:text-red-500"
          }
        >
          INVENTORY
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "hover:text-red-500"
          }
        >
          NEWS
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive ? "text-red-500" : "hover:text-red-500"
          }
        >
          CONTACTS
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 flex gap-1"
              : "hover:text-red-500 flex gap-1"
          }
        >
          <UserCircleIcon className="h-6 w-6 text-black mr-1" />
          LOGIN
        </NavLink>
      </nav>

      <div className="flex items-center text-sm">
        <div className="flex flex-col items-center">
          <span className="font-medium">Call Us Today!</span>
          <span className="ml-2 font-bold text-xl">+88 0145 8549</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
