import { authApi } from "@/services/auth.api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth.state";
import { useNavigate } from "@tanstack/react-router";

export const useProfile = () => {
  const nav = useNavigate();

  const { profile, logIn, logOut } = useAuth();

  const query = useQuery({
    queryKey: ["auth/profile"],
    queryFn: () =>
      authApi
        .getProfile()
        .then((res) => {
          if (res) {
            logIn(res);
          }

          return res;
        })
        .catch((e) => {
          nav({ to: "/login" });
        }),
    enabled: !profile,
  });

  return query;
};
