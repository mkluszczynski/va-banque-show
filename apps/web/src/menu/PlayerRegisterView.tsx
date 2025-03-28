import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlayerCommands } from "@/player/usePlayerCommands";

export function PlayerRegister() {
  const { registerPlayer } = usePlayerCommands();

  const onRegister = () => {
    const nickname = (document.getElementById("nickname") as HTMLInputElement)
      ?.value;
    if (!nickname) return;
    registerPlayer(nickname);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h3>Player Register</h3>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Nickname"
            id="nickname"
            className="focus:outline-none"
          />
          <Button onClick={onRegister}>Register</Button>
        </div>
      </div>
    </div>
  );
}
