"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket-client";

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const socket = getSocket();

    socket.emit("join", userId);

    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);

  return { notifications, setNotifications };
}
