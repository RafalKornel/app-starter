import { useAuth } from "@/auth/auth.state";
import { LogOutButton } from "@/auth/components/LogOutButton";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { NavLink } from "react-router";
import { RouteKeys } from "./route-keys";

export const Navbar = () => {
  const profile = useAuth((state) => state.profile);

  return (
    <nav className="p-2 flex gap-2">
      {profile ? (
        <>
          <NavLink
            to={RouteKeys.Index}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to={RouteKeys.About}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
          <NavLink
            to={RouteKeys.Profile}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
          <LogOutButton />
        </>
      ) : (
        <NavLink
          to={RouteKeys.Login}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      )}

      <ModeToggle />
    </nav>
  );
};
