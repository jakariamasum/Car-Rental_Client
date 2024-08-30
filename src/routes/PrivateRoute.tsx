import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector } from "../redux/hooks";
import {
  logOut,
  useCurrentToekn,
  useCurrentUser,
} from "../redux/features/auth/authSlice";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector(useCurrentToekn);
  const currentUser = useAppSelector(useCurrentUser);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);

  const handleAccessDenied = () => {
    toast.warning("You don't have access here!!");
    logOut();
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      handleAccessDenied();
      return;
    }

    const userRole = currentUser?.role;
    const currentPath = location.pathname;

    const isUserRoute = currentPath.startsWith("/user");
    const isAdminRoute = currentPath.startsWith("/admin");

    if (
      (userRole === "user" && isUserRoute) ||
      (userRole === "admin" && isAdminRoute)
    ) {
      setAccessGranted(true);
    } else {
      handleAccessDenied();
    }
  }, [token, currentUser, location]);

  if (!accessGranted) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
