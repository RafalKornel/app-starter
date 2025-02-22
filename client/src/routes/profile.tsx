import { useAuth } from "@/auth/auth.state";
import { CurrentUserInfo } from "@/components/CurrentUserInfo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  beforeLoad: () => useAuth.getState().loadProfile(),
});

function RouteComponent() {
  return (
    <div>
      <CurrentUserInfo />
    </div>
  );
}
