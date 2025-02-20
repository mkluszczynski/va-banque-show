import { Socket } from "socket.io";

export function validateDto(obj: object): void{
    const isValid = Object.values(obj).every(value => value !== undefined);

    if(!isValid) {
        throw new Error("Invalid DTO");
    }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateDtoMiddleware(socket: Socket, next: (err?: any) => void): void {
    try {
        validateDto(socket.handshake.query);
        next();
    } catch (err) {
        next(err);
    }
}