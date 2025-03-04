import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function CopyGameCode({ gameCode }: { gameCode: string }) {
  const [buttonText, setButtonText] = useState(
    <>
      {gameCode}
      <Copy />
    </>
  );

  const copyCode = () => {
    navigator.clipboard.writeText(gameCode);
    setButtonText(
      <>
        Copied!
        <CopyCheck />
      </>
    );
    setTimeout(() => {
      setButtonText(
        <>
          {gameCode}
          <Copy />
        </>
      );
    }, 2000);
  };

  return (
    <Button id="copy-game-button" onClick={copyCode}>
      {buttonText}
    </Button>
  );
}
