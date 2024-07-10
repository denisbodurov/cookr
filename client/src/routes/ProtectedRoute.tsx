import { useEffect } from "react";
import { useAuth } from "../provider/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return accessToken ? <Outlet /> : null;
};

export default ProtectedRoute
