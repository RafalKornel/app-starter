import { ApiError } from "@/services/api";
import { LoginResponse, LoginBody, authApi } from "@/services/auth.api";
import { useAuth } from "@/auth/auth.state";
import { useMutation } from "@tanstack/react-query";
import { AuthQueries } from "@/services/queries";
import { useNavigate } from "react-router";
import { LocalStorageService } from "@/services/local-storage";
import { RouteKeys } from "@/routes/route-keys";

export const useLogIn = () => {
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const mutation = useMutation<LoginResponse, ApiError, LoginBody>({
    mutationFn: (d) => authApi.login(d),
    mutationKey: [AuthQueries.Login],
  });

  const handleLogin = async (email: string, password: string) => {
    const res = await mutation.mutateAsync({ email, password });

    LocalStorageService.set("access_token", res.accessToken);

    logIn(res.profile);

    const redirectTo = localStorage.getItem("redirect-to");

    LocalStorageService.remove("redirect-to");

    navigate(redirectTo || RouteKeys.Index);
  };

  return { handleLogin, isPending: mutation.isPending };
};
