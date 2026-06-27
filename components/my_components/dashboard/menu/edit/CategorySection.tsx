"use client";

import { useState, useTransition, useRef } from "react";
import { Plus, Trash2, Loader2, ChevronDown, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  deleteCategory,
  updateCategoryName,
  addDish,
} from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";


/* ============================================================
   INLINE ADD DISH FORM
   ============================================================ */

function AddDishInline({
  categoryId,
  menuId,
  onDone,
}: {
  categoryId: string;
  menuId: string;
  onDone: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      nameRef.current?.focus();
      return;
    }

    startTransition(async () => {
      try {
        await addDish(categoryId, menuId, {
          name: name.trim(),
          price: price || "0",
          description: description.trim(),
        });
        toast.success(`"${name}" aggiunto`);
        setName("");
        setPrice("");
        setDescription("");
        nameRef.current?.focus();
      } catch {
        toast.error("Impossibile aggiungere il piatto");
      }
    });
  }

  return (
    <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-3">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        Nuovo piatto
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-2">
        <input
          ref={nameRef}
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as never)}
          placeholder="Nome del piatto..."
          className="h-10 px-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white transition-all placeholder:text-slate-300"
        />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">€</span>
          <input
            type="number"
            min="0"
            step="0.50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white transition-all placeholder:text-slate-300"
          />
        </div>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrizione, ingredienti, allergeni... (opzionale)"
        rows={2}
        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none bg-white transition-all placeholder:text-slate-300"
      />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-sm disabled:opacity-50"
        >
          {isPending ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} strokeWidth={3} />}
          Aggiungi
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   CATEGORY SECTION
   ============================================================ */

interface CategorySectionProps {
  id: string;
  name: string;
  menuId: string;
  dishCount: number;
  children: React.ReactNode;
}

export function CategorySection({ id, name: initialName, menuId, dishCount, children }: CategorySectionProps) {
  const [categoryName, setCategoryName] = useState(initialName);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddDish, setShowAddDish] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  /* Debounced name save — inline timer, niente useCallback generico */
  const nameTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleNameChange(v: string) {
    setCategoryName(v);
    if (nameTimer.current) clearTimeout(nameTimer.current);
    nameTimer.current = setTimeout(async () => {
      try {
        await updateCategoryName(id, v, menuId);
      } catch {
        toast.error("Errore nell'aggiornamento del nome");
      }
    }, 700);
  }

  /* Delete */
  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    setIsDeleting(true);
    try {
      await deleteCategory(id, menuId);
    } catch {
      toast.error("Impossibile eliminare la categoria");
      setIsDeleting(false);
    }
  }

  return (
    <div className={cn(
      "bg-white/90 backdrop-blur-xl border border-slate-100 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-200",
      isDeleting && "opacity-40 pointer-events-none scale-[0.98]"
    )}>
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 sm:px-7 py-5">

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed((v) => !v)}
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:bg-slate-100 transition-all"
          aria-label={isCollapsed ? "Espandi" : "Comprimi"}
        >
          <ChevronDown size={15} className={cn("transition-transform duration-200", isCollapsed && "-rotate-90")} />
        </button>

        {/* Editable name */}
        <input
          value={categoryName}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="NOME CATEGORIA"
          className="flex-1 bg-transparent text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight focus:outline-none focus:text-red-600 transition-colors placeholder:text-slate-200 min-w-0"
        />

        {/* Dish count pill */}
        <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
          {dishCount} {dishCount === 1 ? "piatto" : "piatti"}
        </span>

        {/* Add dish button */}
        <button
          type="button"
          onClick={() => { setShowAddDish(true); setIsCollapsed(false); }}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-sm"
        >
          <Plus size={13} strokeWidth={3} />
          <span className="hidden sm:inline">Piatto</span>
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className={cn(
            "shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border transition-all",
            confirmDelete
              ? "bg-red-600 border-red-600 text-white"
              : "border-slate-100 text-slate-300 hover:text-red-500 hover:border-red-100 hover:bg-red-50"
          )}
          title={confirmDelete ? "Conferma eliminazione" : "Elimina categoria"}
        >
          {isDeleting
            ? <Loader2 size={15} className="animate-spin" />
            : <Trash2 size={15} />
          }
        </button>
      </div>

      {/* ── Body ── */}
      {!isCollapsed && (
        <div className="px-5 sm:px-7 pb-6 space-y-2">
          {children}

          {dishCount === 0 && !showAddDish && (
            <button
              type="button"
              onClick={() => setShowAddDish(true)}
              className="w-full py-8 flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-100 text-slate-300 hover:border-red-200 hover:text-red-400 transition-all group"
            >
              <UtensilsCrossed size={22} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Nessun piatto — clicca per aggiungerne uno
              </span>
            </button>
          )}

          {showAddDish && (
            <AddDishInline
              categoryId={id}
              menuId={menuId}
              onDone={() => setShowAddDish(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}