"use client";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export default function NotificationListener({ userId }: { userId: string }) {

    useEffect(() => {
        if (!userId) return;
        if (!socket) {
            socket = io("/", { path: process.env.NEXT_PUBLIC_SOCKET_PATH || "/api/socket" });
        }

        socket.emit("register", userId);

        socket.on("notification", (data) => {
            // Replace this with your toast or state update
            console.log("🔔 notification", data);
        })

        return () => {
            socket?.off("notification");
        };
    }, [userId]);

    return null;
}