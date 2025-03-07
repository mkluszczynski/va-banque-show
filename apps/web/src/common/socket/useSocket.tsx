import { SocketContext } from "@/common/socket/SocketContext";
import { useContext } from "react";

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}
