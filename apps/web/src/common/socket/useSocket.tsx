import { SocketContext } from "@/common/socket/SocketContext";
import { useContext } from "react";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
