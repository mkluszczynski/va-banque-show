import { LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { usePlayerCommands } from "./usePlayerCommands";

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
