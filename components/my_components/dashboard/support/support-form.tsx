"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createTicket } from "@/app/(account)/(dashboard)/dashboard/support/action";
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS } from "@/lib/ticket-options";

export function SupportForm({
  restaurantId,
  onCreated,
}: {
  restaurantId: string;
  onCreated: () => void;
}) {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<typeof CATEGORY_OPTIONS[number]["value"]>("ALTRO");
  const [priority, setPriority] = useState<typeof PRIORITY_OPTIONS[number]["value"]>("MEDIUM");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !content.trim()) {
      alert("Compila oggetto e descrizione prima di inviare.");
      return;
    }

    setLoading(true);

    try {
      const result = await createTicket({ restaurantId, subject, content, category, priority });
      if (!result.success) {
        alert(result.error || "Errore durante l'invio del ticket.");
        return;
      }
      setSubject("");
      setContent("");
      setCategory("ALTRO");
      setPriority("MEDIUM");
      router.refresh();
      onCreated();
    } catch (error) {
      console.error(error);
      alert("Errore durante l'invio del ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">

        <div className="p-8 border-b border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-1">
            Nuovo ticket
          </h2>

          <p className="text-slate-500 text-sm">
            Hai un problema o una domanda? Apri un ticket e il nostro team ti risponderà.
          </p>
        </div>

        <div className="p-8 space-y-8">

          <div>
            <label className="font-bold text-slate-900 mb-2 block">Oggetto</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Riassumi brevemente il problema..."
              className="w-full rounded-2xl border border-slate-200 p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="font-bold text-slate-900 mb-2 block">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full rounded-2xl border border-slate-200 p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-900 mb-2 block">Priorità</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as typeof priority)}
                className="w-full rounded-2xl border border-slate-200 p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-900 mb-2 block">Descrizione</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Descrivi il problema con quanti più dettagli possibile..."
              className="w-full rounded-2xl border border-slate-200 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-bold text-white"
          >
            {loading ? "Invio in corso..." : "Invia Ticket"}
          </Button>
        </div>
    </div>
  );
}
