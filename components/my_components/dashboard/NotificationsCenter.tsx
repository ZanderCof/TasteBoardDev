"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Info, TriangleAlert, Zap, CheckCheck, ArrowUpRight } from "lucide-react";
import { markNotificationRead, markAllNotificationsRead } from "@/app/(account)/(dashboard)/dashboard/notifications/actions";
import { formatDistanceToNow, format } from "date-fns";
import { it } from "date-fns/locale";
import type { NuviioNotification } from "@/lib/nuviio-notifications";

export type NotificationItem = NuviioNotification;

const typeConfig = {
  INFO: {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    badge: "bg-blue-100 text-blue-700",
    label: "Info",
  },
  UPDATE: {
    icon: Zap,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Aggiornamento",
  },
  MAINTENANCE: {
    icon: TriangleAlert,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    badge: "bg-amber-100 text-amber-700",
    label: "Manutenzione",
  },
} as const;

/* ── Modale dettaglio ── */
function NotificationModal({
  notification,
  onClose,
}: {
  notification: NotificationItem;
  onClose: () => void;
}) {
  const cfg = typeConfig[notification.type] ?? typeConfig.INFO;
  const Icon = cfg.icon;

  // Chiudi con Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-900/10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Banda colorata superiore */}
          <div className={`h-1.5 w-full ${cfg.bg}`} />

          <div className="p-6 space-y-5">
            {/* Header modale */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${cfg.bg} ${cfg.border}`}>
                  <Icon size={18} className={cfg.color} strokeWidth={2.5} />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.badge}`}>
                  {cfg.label}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Titolo */}
            <h2 className="text-lg font-black text-slate-900 leading-snug">
              {notification.title}
            </h2>

            {/* Messaggio completo */}
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {notification.message}
            </p>

            {/* Data */}
            <p className="text-[11px] text-slate-400 font-medium border-t border-slate-50 pt-4">
              {format(new Date(notification.createdAt), "d MMMM yyyy 'alle' HH:mm", { locale: it })}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Componente principale ── */
export function NotificationsCenter({
  initialNotifications,
}: {
  initialNotifications: NotificationItem[];
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<NotificationItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Chiudi dropdown cliccando fuori
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

  function openNotification(n: NotificationItem) {
    setOpen(false);
    setSelected(n);
    if (!n.isRead) {
      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, isRead: true } : item))
      );
      startTransition(() => markNotificationRead(n.id));
    }
  }

  function handleMarkAllRead() {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (unreadIds.length === 0) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    startTransition(() => markAllNotificationsRead(unreadIds));
  }

  return (
    <>
      <div className="relative">
        {/* Bell button */}
        <button
          ref={buttonRef}
          onClick={() => setOpen((v) => !v)}
          aria-label="Notifiche"
          aria-expanded={open}
          className="relative p-3 bg-white rounded-2xl border border-slate-100 text-slate-500 hover:text-red-600 hover:border-red-100 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <Bell size={20} strokeWidth={2.5} />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center bg-red-500 border-2 border-white rounded-full text-[9px] font-black text-white leading-none px-0.5">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown compatto */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-[calc(100%+0.5rem)] w-80 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell size={15} className="text-slate-700" strokeWidth={2.5} />
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
                      <CheckCheck size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Lista compatta */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                    <Bell size={26} strokeWidth={1.5} className="mb-2 opacity-40" />
                    <p className="text-sm font-medium">Nessuna notifica</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const cfg = typeConfig[n.type] ?? typeConfig.INFO;
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => openNotification(n)}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 group ${
                          n.isRead ? "bg-white" : "bg-slate-50/60"
                        }`}
                      >
                        {/* Icona tipo */}
                        <div className={`shrink-0 mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                          <Icon size={13} className={cfg.color} strokeWidth={2.5} />
                        </div>

                        {/* Testo breve */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            {!n.isRead && (
                              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                            )}
                            <p className={`text-xs leading-snug truncate ${n.isRead ? "font-medium text-slate-600" : "font-bold text-slate-900"}`}>
                              {n.title}
                            </p>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {n.message}
                          </p>
                          <p className="text-[10px] text-slate-300 mt-0.5">
                            {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: it })}
                          </p>
                        </div>

                        {/* Arrow hint */}
                        <ArrowUpRight
                          size={13}
                          className="shrink-0 mt-1 text-slate-200 group-hover:text-slate-400 transition-colors"
                        />
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modale dettaglio */}
      {selected && (
        <NotificationModal
          notification={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
