"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, UtensilsCrossed } from "lucide-react";
// IMPORTA LO STORE LOCALE
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";

export function AddDishModal({
  isOpen,
  onClose,
  categoryId,
}: {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}) {
  // Prendi l'azione addDish dallo store
  const addDishToStore = useMenuStore((state) => state.addDish);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    // SALVATAGGIO LOCALE (Zustand)
    addDishToStore(categoryId, {
      name: formData.name,
      price: formData.price,
      description: formData.description,
    });

    // Reset form e chiusura
    setFormData({ name: "", price: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-112.5 bg-white rounded-[2.5rem] p-8 border-none font-jakarta">
        <DialogHeader>
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-2">
            <UtensilsCrossed size={24} />
          </div>
          <DialogTitle className="text-3xl font-black text-slate-900 tracking-tighter">
            Nuova <span className="text-red-600">Portata</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Nome Piatto
              </Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="es. Pizza Margherita"
                className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 ring-yellow-400/50 font-bold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Prezzo (€)
              </Label>
              <Input
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="8.50"
                className="h-12 rounded-xl bg-slate-50 border-none focus:ring-2 ring-yellow-400/50 font-bold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Descrizione
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Racconta brevemente il piatto..."
                className="rounded-xl bg-slate-50 border-none focus:ring-2 ring-yellow-400/50 min-h-25 resize-none"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus size={18} /> Aggiungi alla sezione
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
