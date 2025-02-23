import { useCommands } from "../hooks/useCommands";

export function PlayerRegister() {
  const { registerPlayer } = useCommands();

  const onRegister = () => {
    const nickname = (document.getElementById("nickname") as HTMLInputElement)
      ?.value;
    if (!nickname) return;
    registerPlayer(nickname);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1>Player Register</h1>
        <input
          type="text"
          placeholder="Nickname"
          id="nickname"
          className="focus:outline-none"
        />
        <button onClick={onRegister} className="hover:bg-black">
          Register
        </button>
      </div>
    </div>
  );
}
