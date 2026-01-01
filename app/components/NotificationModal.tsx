"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scrollArea";
import { useNotifications } from "../hooks/useNotification";

type Noti = {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
};

export const NotificationDropdown = ({ userId }: { userId: string }) => {
  const [list, setList] = useState<Noti[]>([]);

  /** 🔹 initial fetch */
  async function fetchNoti() {
    const res = await fetch(`/api/notifications?userId=${userId}`);
    const data = await res.json();
    if (data.success) setList(data.notifications);
  }

  /** 🔹 realtime notifications */
  const { notifications } = useNotifications(userId);

  /** 🔹 merge realtime notifications into list */
  useEffect(() => {
    if (!notifications.length) return;

    setList((prev) => {
      const existing = new Set(prev.map((n) => n.id));
      const fresh = notifications.filter((n) => !existing.has(n.id));
      return [...fresh, ...prev];
    });
  }, [notifications]);

  /** 🔹 mark ALL notifications as read */
  async function markAllRead() {
    if (!userId) return;

    await fetch("/api/notifications/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    setList((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = list.filter((n) => !n.read).length;

  /** 🔹 initial load */
  useEffect(() => {
    if (!userId) return;
    fetchNoti();
  }, [userId]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={markAllRead}
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-80 p-0 pb-3">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </div>

        <ScrollArea className="h-[300px]">
          {list.length ? (
            list.map((n) => (
              <div
                key={n.id}
                className={`p-4 border-b ${
                  !n.read ? "bg-muted/30" : ""
                }`}
              >
                <p className="font-medium">{n.type}</p>
                <p className="text-sm text-muted-foreground">{n.message}</p>
                <p className="text-xs mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="p-6 text-center text-muted-foreground">
              No notifications yet
            </p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
