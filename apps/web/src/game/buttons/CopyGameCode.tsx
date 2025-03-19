import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export function CopyButton({
  copyContent,
  copyText,
}: {
  copyContent: string;
  copyText: string;
}) {
  const [buttonText, setButtonText] = useState(
    <CopyButtonText copyText={copyText} />
  );

  const copyCode = () => {
    navigator.clipboard.writeText(copyContent);
    setButtonText(<CopyText />);
    setTimeout(() => {
      setButtonText(<CopyButtonText copyText={copyText} />);
    }, 2000);
  };

  return (
    <Button id="copy-game-button" onClick={copyCode}>
      {buttonText}
    </Button>
  );
}

function CopyButtonText({ copyText }: { copyText: string }) {
  return (
    <>
      {copyText}
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
