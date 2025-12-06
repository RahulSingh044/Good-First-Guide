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


type Noti = {
  _id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  meta?: any;
};

export const NotificationDropdown = ({ userId }: { userId: string }) => {
  const [list, setList] = useState<Noti[]>([]);

  async function fetchNoti() {
    const res = await fetch(`/api/notifications?userId=${userId}`);
    const data = await res.json();
    if (data.success) setList(data.notifications);
  }

  async function markRead(id: string) {
    await fetch("/api/notifications/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id }),
    });
    setList((s) => s.map(n => n._id === id ? { ...n, read: true } : n));
  }

  const unreadCount = list.filter(n => !n.read).length;

  useEffect(() => {
    if (!userId) return;
    fetchNoti();

    const handler = (e: any) => {
      // when socket emits, re-fetch list
      fetchNoti();
    };
    window.addEventListener("gfg:notification", handler);
    return () => window.removeEventListener("gfg:notification", handler);
  }, [userId, unreadCount]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={() => markRead(userId)} variant="ghost" size="icon" className="relative cursor-pointer">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 pb-3" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h4 className="font-semibold text-foreground">Notifications</h4>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {list.length > 0 ? (
            <div className="divide-y divide-border">
              {list.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${!notification.read ? "bg-muted/30" : ""
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-sm text-sm text-foreground font-bold">
                          {notification.type}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {!notification.read && <button onClick={() => markRead(notification._id)} style={{ marginTop: 6 }}>Mark as read</button>}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No notifications yet
            </div>
          )}
        </ScrollArea>
        {/* <div className="p-2 border-t border-border">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div> */}
      </PopoverContent>
    </Popover>
  );
};
