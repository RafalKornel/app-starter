import { authApi } from "@/services/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth.state";

export const useLogOut = () => {
  const stateLogOut = useAuth((state) => state.logOut);

  const mutation = useMutation({
    mutationFn: () => authApi.logout(),
    mutationKey: ["auth/logout"],
  });

  const handleLogOut = () => {
    mutation.mutateAsync().then(() => {
      stateLogOut();
    });
  };

  return { handleLogOut, isPending: mutation.isPending };
};
