import { ApiError } from "@/services/api";
import { RegisterBody, RegisterResponse, authApi } from "@/services/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation<RegisterResponse, ApiError, RegisterBody>({
    mutationFn: (d) => authApi.register(d),
    mutationKey: ["register"],
  });
};
