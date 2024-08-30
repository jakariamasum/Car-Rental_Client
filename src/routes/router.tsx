import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import AllCars from "../pages/allCars/AllCars";
import About from "../pages/about/About";
import Error from "../pages/error/Error";
import UserDashboard from "../components/layout/userLayout/UserDashboardLayout";
import Overview from "../pages/overview/Overview";
import UpdateProfile from "../pages/updateProfile/UpdateProfile";
import Booking from "../pages/booking/Booking";
import Payment from "../pages/payment/Payment";
import CarDetails from "../pages/carDetails/CarDetails";
import AllUser from "../pages/alluser/AllUser";
import ManageBooking from "../pages/manageBooking/ManageBooking";
import AllBookings from "../pages/allBookings/AllBookings";
import ManageCars from "../pages/manageCars/ManageCars";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "all-cars",
        element: <AllCars />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "details/:id",
        element: <CarDetails />,
      },
    ],
  },
  {
    path: "user",
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <>User dashboard</>,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <>Admin dashboard</>,
      },
      {
        path: "users",
        element: <AllUser />,
      },
      {
        path: "manage-bookings",
        element: <ManageBooking />,
      },
      {
        path: "manage-cars",
        element: <ManageCars />,
      },
      {
        path: "bookings",
        element: <AllBookings />,
      },
    ],
  },
]);
