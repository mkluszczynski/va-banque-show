import { createContext } from "react";
import { io, Socket } from "socket.io-client";

// const socket = io("http://localhost:3010");
const socket = io("https://va-banque-api.mkluszczynski.dev");

export const SocketContext = createContext<Socket>(socket);
