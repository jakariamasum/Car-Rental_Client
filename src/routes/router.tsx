import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllCars from "../pages/AllCars";
import About from "../pages/About";
import Error from "../pages/Error";
import UserDashboard from "../components/layout/UserDashboardLayout";
import Overview from "../pages/user/Overview";
import UpdateProfile from "../pages/user/UpdateProfile";
import Booking from "../pages/user/Booking";
import Payment from "../pages/user/Payment";
import AllUser from "../pages/admin/AllUser";
import ManageBooking from "../pages/admin/ManageBooking";
import AllBookings from "../pages/admin/AllBookings";
import ManageCars from "../pages/admin/ManageCars";
import PrivateRoute from "./PrivateRoute";
import CarDetails from "../pages/CarDetails";
import MakeBooking from "../pages/user/MakeBooking";
import TermsAndConditions from "../pages/TermsAndCondition";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfServices";
import AdminDashboard from "../components/layout/AdminDashboardLayout";
import ContactUs from "../pages/ContactUs";
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
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "book-car",
        element: (
          <PrivateRoute>
            <MakeBooking />
          </PrivateRoute>
        ),
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
        path: "make-booking",
        element: <MakeBooking />,
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
        <AdminDashboard />
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
