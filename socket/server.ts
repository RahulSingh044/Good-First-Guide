import { Server as IOServer } from "socket.io";

let io: IOServer | null = (global as any).__io || null;

export function initializeSocket(server: any) {
    if (io) return io;

    io = new IOServer(server, {
        path: process.env.NEXT_PUBLIC_SOCKET_PATH || "/api/socket",
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("register", (userId: string) => {
            socket.join(userId);
            console.log(`User ${userId} registered with socket ID: ${socket.id}`);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    (global as any).__io = io;
    return io;
}

export function getIO() {
    if(!io) throw new Error("Socket.io not initialized");
    return io;
}

