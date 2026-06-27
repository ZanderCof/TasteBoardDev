"use client";

import { useState, useRef, useTransition } from "react";
import {
  Trash2,
  ChevronDown,
  ImagePlus,
  Loader2,
  Check,
} from "lucide-react";
import Image from "next/image";
import { deleteDish, updateDish } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/* ============================================================
   PROPS
   ============================================================ */

interface DishItemProps {
  id: string;
  menuId: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string | null;
}

/* ============================================================
   COMPONENT
   ============================================================ */

export function DishItem({ id, menuId, name, price, description, imageUrl }: DishItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  /* Local editing state */
  const [localName, setLocalName] = useState(name);
  const [localPrice, setLocalPrice] = useState(price);
  const [localDescription, setLocalDescription] = useState(description);
  const [localImageUrl, setLocalImageUrl] = useState(imageUrl ?? null);

  const [isSaving, startSaving] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const descTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Save helpers ── */

  function saveField(field: "name" | "price" | "description", value: string) {
    startSaving(async () => {
      try {
        const payload: Record<string, string | number> = {};
        if (field === "price") {
          const clean = parseFloat(value.replace(",", "."));
          payload.price = isNaN(clean) ? 0 : clean;
        } else {
          payload[field] = value;
        }
        await updateDish(id, menuId, payload as never);
      } catch {
        toast.error("Errore nel salvataggio");
      }
    });
  }

  function handleNameChange(v: string) {
    setLocalName(v);
    if (nameTimer.current) clearTimeout(nameTimer.current);
    nameTimer.current = setTimeout(() => saveField("name", v), 700);
  }
  function handleDescriptionChange(v: string) {
    setLocalDescription(v);
    if (descTimer.current) clearTimeout(descTimer.current);
    descTimer.current = setTimeout(() => saveField("description", v), 700);
  }
  function handlePriceBlur() {
    saveField("price", localPrice);
  }

  /* ── Image upload ── */

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Preview immediata — integra con il tuo storage (Cloudinary, S3, ecc.)
    const url = URL.createObjectURL(file);
    setLocalImageUrl(url);
    toast.info("Immagine selezionata — implementa l'upload al tuo storage.");
  }

  /* ── Delete ── */

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    setIsDeleting(true);
    try {
      await deleteDish(id, menuId);
    } catch {
      toast.error("Impossibile eliminare il piatto");
      setIsDeleting(false);
    }
  }

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <div
      className={cn(
        "group relative rounded-2xl border transition-all duration-200 overflow-hidden",
        expanded
          ? "bg-white border-slate-200 shadow-lg shadow-slate-100/60"
          : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100/40",
        isDeleting && "opacity-40 pointer-events-none scale-98"
      )}
    >
      {/* ── Collapsed row (sempre visibile) ── */}
      <div
        className="flex items-center gap-3 sm:gap-4 px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Thumbnail */}
        <div
          onClick={(e) => { e.stopPropagation(); if (expanded) handleImageClick(); }}
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center transition-all",
            expanded
              ? "cursor-pointer ring-2 ring-red-200 ring-offset-1 hover:ring-red-400"
              : "bg-slate-50"
          )}
        >
          {localImageUrl ? (
            <Image src={localImageUrl} alt={localName} fill className="object-cover" unoptimized />
          ) : (
            <ImagePlus
              size={18}
              className={cn(
                "transition-colors",
                expanded ? "text-red-400" : "text-slate-200 group-hover:text-slate-300"
              )}
            />
          )}
        </div>

        {/* Name + description */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-900 truncate leading-tight text-sm sm:text-base">
            {localName || <span className="text-slate-300 italic">Senza nome</span>}
          </p>
          {localDescription && (
            <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5 italic">
              {localDescription}
            </p>
          )}
        </div>

        {/* Price + chevron */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
            €{parseFloat(localPrice || "0").toFixed(2)}
          </span>
          <div className={cn(
            "w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center transition-all duration-200",
            expanded && "bg-slate-900 border-slate-900 rotate-180"
          )}>
            <ChevronDown size={13} className={expanded ? "text-white" : "text-slate-400"} />
          </div>
        </div>
      </div>

      {/* ── Expanded edit panel ── */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-50 space-y-3" onClick={(e) => e.stopPropagation()}>
          
          {/* Immagine + note upload */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleImageClick}
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-100 px-3 py-2 rounded-xl transition-all"
            >
              <ImagePlus size={14} />
              {localImageUrl ? "Cambia immagine" : "Aggiungi immagine"}
            </button>
            {localImageUrl && (
              <button
                type="button"
                onClick={() => setLocalImageUrl(null)}
                className="text-xs font-bold text-slate-300 hover:text-red-400 transition-colors"
              >
                Rimuovi
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Nome */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nome piatto</label>
            <input
              value={localName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Nome del piatto..."
              className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all bg-slate-50/50"
            />
          </div>

          {/* Descrizione */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descrizione</label>
            <textarea
              value={localDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Ingredienti, preparazione, allergeni..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none bg-slate-50/50 placeholder:text-slate-300"
            />
          </div>

          {/* Prezzo */}
          <div className="flex items-end gap-3">
            <div className="space-y-1 flex-1 max-w-40">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prezzo (€)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">€</span>
                <input
                  type="number"
                  min="0"
                  step="0.50"
                  value={localPrice}
                  onChange={(e) => setLocalPrice(e.target.value)}
                  onBlur={handlePriceBlur}
                  className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            {/* Saving indicator */}
            <div className="h-10 flex items-center gap-1.5 text-xs font-bold text-slate-400 pb-0.5">
              {isSaving ? (
                <><Loader2 size={13} className="animate-spin text-red-400" /> Salvataggio...</>
              ) : (
                <><Check size={13} className="text-emerald-500" /> Salvato</>
              )}
            </div>
          </div>

          {/* Delete */}
          <div className="pt-2 border-t border-slate-50 flex justify-end">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className={cn(
                "flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all",
                confirmDelete
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "text-slate-300 hover:text-red-500 hover:bg-red-50"
              )}
            >
              {isDeleting
                ? <Loader2 size={13} className="animate-spin" />
                : <Trash2 size={13} />
              }
              {confirmDelete ? "Conferma eliminazione" : "Elimina piatto"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}