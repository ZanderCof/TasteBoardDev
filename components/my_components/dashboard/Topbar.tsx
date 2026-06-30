"use client";

import StoreSwitcher from "./StoreSwitcher";
import { NotificationsCenter, type NotificationItem } from "./NotificationsCenter";

interface Restaurant {
  id: string;
  name: string;
  type: string | null;
}

interface TopbarProps {
  initialStores: Restaurant[];
  notifications: NotificationItem[];
}

export default function Topbar({ initialStores, notifications }: TopbarProps) {
  return (
    <header className="h-16 sm:h-22 bg-white/60 border border-white/80 rounded-[1.5rem] sm:rounded-[2.5rem] px-3 sm:px-6 flex items-center justify-end gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center gap-2">
        <NotificationsCenter initialNotifications={notifications} />

        <div className="h-8 w-px bg-slate-200 mx-3 opacity-50" />

        <StoreSwitcher initialStores={initialStores} />
      </div>
    </header>
  );
}
