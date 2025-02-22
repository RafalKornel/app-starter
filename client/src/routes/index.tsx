import { createFileRoute } from "@tanstack/react-router";
import { Counter } from "../components/Counter";
import { CurrentUserInfo } from "@/components/CurrentUserInfo";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Counter />
      <CurrentUserInfo />
    </div>
  );
}
