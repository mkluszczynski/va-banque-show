import { usePlayerCommands } from "@/hooks/commands/usePlayerCommands";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function LogoutButton() {
  const { logout } = usePlayerCommands();
  return (
    <Button
      onClick={() => {
        logout();
      }}
    >
      Logout
      <LogOut />
    </Button>
  );
}
