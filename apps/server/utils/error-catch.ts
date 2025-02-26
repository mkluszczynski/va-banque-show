/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Socket } from "socket.io";

export const errorMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const wrap = (handler: Function) => {
    return async (...args: unknown[]) => {
      try {
        await handler(...args);
      } catch (e) {
        const err = e as Error;
        socket.emit("error", { message: err.message });
      }
    };
  };

  const originalOn = socket.on;
  socket.on = function(event: string, handler: Function) {
    return originalOn.call(this, event, wrap(handler));
  };

  next();
};