import { ApiError } from "@/services/api";
import { LoginResponse, LoginBody, authApi } from "@/services/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useLogIn = () => {
  return useMutation<LoginResponse, ApiError, LoginBody>({
    mutationFn: (d) => authApi.login(d),
    mutationKey: ["login"],
  });
};
