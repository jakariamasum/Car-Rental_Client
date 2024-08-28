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
    ],
  },
  {
    path: "dashboard",
    element: <UserDashboard />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
]);
