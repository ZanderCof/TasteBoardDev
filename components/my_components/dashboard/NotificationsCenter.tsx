"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Info, TriangleAlert, CheckCircle, Megaphone, CheckCheck } from "lucide-react";
import { markNotificationRead, markAllNotificationsRead } from "@/app/(account)/(dashboard)/dashboard/notifications/actions";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "SUCCESS" | "CHANGELOG";
  createdAt: string;
  isRead: boolean;
};

const typeConfig = {
  INFO: {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    label: "Info",
  },
  WARNING: {
    icon: TriangleAlert,
    color: "text-amber-500",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    label: "Avviso",
  },
  SUCCESS: {
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Risolto",
  },
  CHANGELOG: {
    icon: Megaphone,
    color: "text-red-500",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
    label: "Novità",
  },
} as const;

export function NotificationsCenter({
  initialNotifications,
}: {
  initialNotifications: NotificationItem[];
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Chiudi il pannello cliccando fuori
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleMarkRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    startTransition(() => markNotificationRead(id));
  }

  function handleMarkAllRead() {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (unreadIds.length === 0) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    startTransition(() => markAllNotificationsRead(unreadIds));
  }

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifiche"
        aria-expanded={open}
        className="relative p-3 bg-white rounded-2xl border border-slate-100 text-slate-500 hover:text-red-600 hover:border-red-100 hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        <Bell size={20} strokeWidth={2.5} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center bg-red-500 border-2 border-white rounded-full text-[9px] font-black text-white leading-none px-0.5">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-[calc(100%+0.5rem)] w-[22rem] bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-slate-700" strokeWidth={2.5} />
                <span className="text-sm font-bold text-slate-900">Notifiche</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full">
                    {unreadCount} nuove
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    disabled={isPending}
                    title="Segna tutte come lette"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <CheckCheck size={15} />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[26rem] overflow-y-auto divide-y divide-slate-50">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <Bell size={28} strokeWidth={1.5} className="mb-2 opacity-40" />
                  <p className="text-sm font-medium">Nessuna notifica</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const cfg = typeConfig[n.type];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3.5 transition-colors ${
                        n.isRead ? "bg-white" : "bg-slate-50/80"
                      }`}
                    >
                      <div className={`shrink-0 mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                        <Icon size={15} className={cfg.color} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm leading-snug ${n.isRead ? "font-medium text-slate-700" : "font-bold text-slate-900"}`}>
                            {n.title}
                          </p>
                          {!n.isRead && (
                            <button
                              onClick={() => handleMarkRead(n.id)}
                              disabled={isPending}
                              title="Segna come letta"
                              className="shrink-0 mt-0.5 w-2 h-2 rounded-full bg-red-500 hover:bg-red-700 transition-colors"
                            />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {n.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${cfg.badge}`}>
                            {cfg.label}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {formatDistanceToNow(new Date(n.createdAt), {
                              addSuffix: true,
                              locale: it,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
