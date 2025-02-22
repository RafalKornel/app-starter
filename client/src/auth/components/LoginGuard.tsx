import { useEffect, useState } from "react";
import { useAuth } from "../auth.state";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router";
import { LocalStorageService } from "@/services/local-storage";
import { RouteKeys } from "@/routes/route-keys";

export const LoginGuard = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { profile, loadProfile } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadProfile()
      .catch(() => navigate(RouteKeys.Login))
      .finally(() => setIsLoading(false));
  }, []);

  if (!profile && !isLoading) {
    LocalStorageService.set("redirect-to", location.pathname);

    return <Navigate to={RouteKeys.Login} />;
  }

  return <Outlet />;
};
