import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket>(io("http://localhost:3000"));
