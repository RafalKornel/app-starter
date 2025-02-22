import { LoginGuard } from "@/auth/components/LoginGuard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <LoginGuard>
      <div className="p-2">
        <div>Hello from About!</div>
      </div>
    </LoginGuard>
  );
}
