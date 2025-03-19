import { useSocket } from "@/common/socket/useSocket";
import { Team } from "@/team/Team";
import { createContext, use, useState } from "react";

export type WinnerContextType = {
  winner: Team | null;
  setWinner: (team: Team | null) => void;
};

const WinnerContext = createContext<WinnerContextType>({
  winner: null,
  setWinner: () => {},
});

export function WinnerProvider({ children }: { children: React.ReactNode }) {
  const [winner, setWinner] = useState<Team | null>(null);

  const socket = useSocket();

  socket.on("game:winner", ({ winner }: { winner: Team }) => {
    console.log("game:winner", winner);

    setWinner(winner);
  });

  return (
    <WinnerContext.Provider value={{ winner, setWinner }}>
      {children}
    </WinnerContext.Provider>
  );
}

export const useWinner = () => {
  return use(WinnerContext);
};
