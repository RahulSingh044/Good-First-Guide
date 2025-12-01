import { Bell } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scrollArea";


interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Issue Completed",
    message: "Your contribution to 'Fix login bug' has been merged!",
    time: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "New Comment",
    message: "Someone commented on 'Add dark mode support'",
    time: "5 hours ago",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Issue Updated",
    message: "Status changed for 'Improve documentation'",
    time: "1 day ago",
    read: true,
    type: "warning",
  },
  {
    id: "4",
    title: "Bookmark Reminder",
    message: "Issue 'Add unit tests' is still open",
    time: "2 days ago",
    read: true,
    type: "info",
  },
];

export const NotificationDropdown = () => {
  const unreadCount = 0;
//   notifications.filter((n) => !n.read).length;

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "warning":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
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
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-muted/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        !notification.read ? "bg-primary" : "bg-transparent"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-sm text-sm text-foreground">
                          {notification.title}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getTypeStyles(notification.type)}`}
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
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
