import { usePlayerCommands } from "@/hooks/commands/usePlayerCommands";
import { Button } from "./ui/button";

export function LogoutButton() {
  const { logout } = usePlayerCommands();
  return (
    <Button
      onClick={() => {
        logout();
      }}
    >
      Logout
    </Button>
  );
}
