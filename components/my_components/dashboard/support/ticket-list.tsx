"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MessageSquare, Send, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryLabel, priorityLabel, STATUS_LABELS, STATUS_STYLES } from "@/lib/ticket-options";
import type { HubTicketDetail } from "@/lib/hub-sync";
import { replyToTicket } from "@/app/(account)/(dashboard)/dashboard/support/action";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("it-IT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ReplyBox({ ticket }: { ticket: HubTicketDetail }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const isClosed = ticket.status === "RESOLVED" || ticket.status === "CLOSED";

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      const result = await replyToTicket(ticket.id, message);
      if (!result.success) {
        alert(result.error || "Errore durante l'invio della risposta.");
        return;
      }
      setMessage("");
      router.refresh();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-2 pt-2">
      {isClosed && (
        <p className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
          <RotateCcw size={14} />
          Questo ticket è {STATUS_LABELS[ticket.status]?.toLowerCase()}. Rispondendo lo riaprirai automaticamente.
        </p>
      )}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        placeholder={isClosed ? "Scrivi per riaprire il ticket..." : "Scrivi una risposta..."}
        className="w-full rounded-xl border border-slate-200 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || !message.trim()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
        >
          <Send size={14} />
          {sending ? "Invio..." : isClosed ? "Rispondi e riapri" : "Rispondi"}
        </button>
      </div>
    </div>
  );
}

function TicketRow({ ticket, defaultOpen }: { ticket: HubTicketDetail; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const hasReplies = ticket.replies.length > 0;

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "text-[11px] font-black uppercase tracking-wide px-2 py-0.5 rounded-lg border",
                STATUS_STYLES[ticket.status] ?? "bg-slate-100 text-slate-600 border-slate-200",
              )}
            >
              {STATUS_LABELS[ticket.status] ?? ticket.status}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              {categoryLabel(ticket.category)} · {priorityLabel(ticket.priority)}
            </span>
          </div>
          <p className="font-bold text-slate-900 truncate">{ticket.subject}</p>
          <p className="text-sm text-slate-500">{formatDate(ticket.createdAt)}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-slate-400">
          {hasReplies && (
            <span className="flex items-center gap-1 text-xs font-bold text-red-600">
              <MessageSquare size={14} />
              {ticket.replies.length}
            </span>
          )}
          <ChevronDown size={20} className={cn("transition-transform", open && "rotate-180")} />
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50">
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{ticket.content}</p>

          {hasReplies && (
            <div className="space-y-3 pt-2">
              {ticket.replies.map((reply) => (
                <div key={reply.id} className="bg-white border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-slate-900">{reply.author}</span>
                    <span className="text-xs text-slate-400">{formatDate(reply.createdAt)}</span>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{reply.message}</p>
                </div>
              ))}
            </div>
          )}

          {!hasReplies && (
            <p className="text-sm text-slate-400 italic">Nessuna risposta ancora.</p>
          )}

          <ReplyBox ticket={ticket} />
        </div>
      )}
    </div>
  );
}

export function TicketList({
  tickets,
  error,
}: {
  tickets: HubTicketDetail[];
  error?: string;
}) {
  if (error) {
    return (
      <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl p-4">
        Non è stato possibile recuperare i ticket in questo momento. {error}
      </p>
    );
  }

  if (tickets.length === 0) {
    return <p className="text-slate-400 text-sm">Non hai ancora aperto nessun ticket.</p>;
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket, i) => (
        <TicketRow key={ticket.id} ticket={ticket} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
