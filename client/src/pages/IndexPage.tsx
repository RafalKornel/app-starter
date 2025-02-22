import { Counter } from "../components/Counter";
import { CurrentUserInfo } from "@/components/CurrentUserInfo";

export function IndexPage() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Counter />
      <CurrentUserInfo />
    </div>
  );
}
