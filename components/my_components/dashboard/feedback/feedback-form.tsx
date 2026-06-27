"use client";

import { useState } from "react";
import { Star, Send, Bug, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitFeedback } from "@/app/(account)/(dashboard)/dashboard/feedback/action";

export function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [bug, setBug] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Seleziona una valutazione prima di inviare.");
      return;
    }

    setLoading(true);

    try {
      const result = await submitFeedback({ rating, bug, suggestion });
      if (!result.success) {
        alert(result.error || "Errore durante l'invio del feedback.");
        return;
      }
      setSent(true);
    } catch (error) {
      console.error(error);
      alert("Errore durante l'invio del feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Send className="text-green-600" size={36} />
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-3">
            Grazie per il feedback!
          </h1>

          <p className="text-slate-500">
            Il tuo contributo ci aiuta a migliorare TasteBoard prima del
            lancio ufficiale.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">

        <div className="p-8 border-b border-slate-100">
          <h1 className="text-4xl font-black text-slate-900 mb-3">
            Feedback Beta
          </h1>

          <p className="text-slate-500">
            Stai utilizzando una versione di test di TasteBoard.
            Raccontaci la tua esperienza e aiutaci a migliorare il prodotto.
          </p>
        </div>

        <div className="p-8 space-y-10">

          {/* RATING */}

          <div>
            <h2 className="font-bold text-slate-900 mb-4">
              Come valuti la tua esperienza?
            </h2>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={34}
                    className={`transition-all ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* BUG */}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bug size={18} />
              <h2 className="font-bold text-slate-900">
                Hai trovato qualche problema?
              </h2>
            </div>

            <textarea
              value={bug}
              onChange={(e) => setBug(e.target.value)}
              rows={5}
              placeholder="Descrivi eventuali bug, errori o comportamenti anomali..."
              className="w-full rounded-2xl border border-slate-200 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* SUGGERIMENTI */}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} />
              <h2 className="font-bold text-slate-900">
                Cosa miglioreresti?
              </h2>
            </div>

            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              rows={6}
              placeholder="Funzionalità mancanti, suggerimenti, idee..."
              className="w-full rounded-2xl border border-slate-200 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-bold text-white"
          >
            {loading ? "Invio in corso..." : "Invia Feedback"}
          </Button>
        </div>
      </div>
    </div>
  );
}