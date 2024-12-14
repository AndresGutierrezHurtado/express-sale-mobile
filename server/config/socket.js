import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.VITE_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });

    return io;
}

export const getSocket = () => {
    if (!io) {
        throw new Error("Socket not initialized");
    }
    return io;
}
