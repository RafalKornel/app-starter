import { ApiError } from "@/services/api";
import { LoginResponse, LoginBody, authApi } from "@/services/auth.api";
import { useAuth } from "@/auth/auth.state";
import { useMutation } from "@tanstack/react-query";

export const useLogIn = () => {
  const stateLogIn = useAuth((state) => state.logIn);

  const mutation = useMutation<LoginResponse, ApiError, LoginBody>({
    mutationFn: (d) => authApi.login(d),
    mutationKey: ["login"],
  });

  const handleLogin = async (email: string, password: string) => {
    return mutation.mutateAsync({ email, password }).then((res) => {
      localStorage.setItem("access_token", res.accessToken);

      stateLogIn(res.profile);
    });
  };

  return {handleLogin, isPending: mutation.isPending};
};
