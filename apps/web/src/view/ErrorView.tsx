import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";

export function ErrorView() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1>Opsss...</h1>
      <div className="flex gap-2 items-center justify-center">
        <p>It seems you cached a bug!</p>
        <Bug size={24} />
      </div>
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
}
