/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Socket } from "socket.io";
import { Logger } from "./logger";

export const handleError = (socket: Socket, next: (err?: Error) => void) => {
  const logger = new Logger(["Server", "ErrorHandler"]);
  const wrap = (handler: Function) => {
    return async (...args: unknown[]) => {
      try {
        await handler(...args);
      } catch (e) {
        const err = e as Error;

        logger.error(err.message);

        socket.emit("error", { message: err.message });
      }
    };
  };

  const originalOn = socket.on;
  socket.on = function (event: string, handler: Function) {
    return originalOn.call(this, event, wrap(handler));
  };

  next();
};
