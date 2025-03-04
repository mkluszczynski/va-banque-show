import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function CopyGameCode({ gameCode }: { gameCode: string }) {
  const [buttonText, setButtonText] = useState(
    <GameCodeText gameCode={gameCode} />
  );

  const copyCode = () => {
    navigator.clipboard.writeText(gameCode);
    setButtonText(<CopyText />);
    setTimeout(() => {
      setButtonText(<GameCodeText gameCode={gameCode} />);
    }, 2000);
  };

  return (
    <Button id="copy-game-button" onClick={copyCode}>
      {buttonText}
    </Button>
  );
}

function GameCodeText({ gameCode }: { gameCode: string }) {
  return (
    <>
      {gameCode}
      <Copy />
    </>
  );
}

function CopyText() {
  return (
    <>
      Copied!
      <CopyCheck />
    </>
  );
}
