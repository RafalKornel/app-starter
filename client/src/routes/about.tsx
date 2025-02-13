import { createFileRoute } from "@tanstack/react-router";
import { FetchTest } from "../components/FetchTest";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <div>Hello from About!</div>
      <div>
        <FetchTest />
      </div>
    </div>
  );
}
