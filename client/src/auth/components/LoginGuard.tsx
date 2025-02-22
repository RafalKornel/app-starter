import { PropsWithChildren } from "react";
import { useProfile } from "../hooks/useProfile";
import { useNavigate } from "@tanstack/react-router";

export const LoginGuard = ({ children }: PropsWithChildren<{}>) => {
  const profileQuery = useProfile();

  console.log(profileQuery.data);

  const nav = useNavigate();

  if (profileQuery.status === "pending") {
    return <div>Loading...</div>;
  }

  if (profileQuery.error) {
    nav({ to: "/login" });
    return null;
  }

  return <>{children}</>;
};
