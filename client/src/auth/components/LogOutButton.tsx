import { Button } from "@/components/ui/button";
import { useLogOut } from "../hooks/useLogOut";

export const LogOutButton = () => {
  const { handleLogOut, isPending } = useLogOut();

  return (
    <Button onClick={handleLogOut} disabled={isPending}>
      LogOut
    </Button>
  );
};
