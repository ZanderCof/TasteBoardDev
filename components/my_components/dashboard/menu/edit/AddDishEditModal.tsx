"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Utensils, Euro, FileText, Sparkles } from "lucide-react";
import { addDish } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";

export function AddDishEditModal({ isOpen, onClose, categoryId, menuId }: { isOpen: boolean; onClose: () => void; categoryId: string; menuId: string; }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    setLoading(true);
    try {
      const p = parseFloat(formData.price.replace(",", "."));
      await addDish(categoryId, menuId, {
        name: formData.name,
        price: isNaN(p) ? 0 : p,
        description: formData.description
      });
      setFormData({ name: "", price: "", description: "" });
      onClose();
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-2xl border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl font-jakarta">
        {/* Header Decorativo */}
        <div className="h-32 bg-linear-to-br from-red-500 to-red-600 relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[url('https://transparenttextures.com')]" />
          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-red-600 z-10">
            <Utensils size={32} strokeWidth={2.5} />
          </div>
        </div>

        <div className="p-8 pt-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
              Aggiungi <span className="text-red-600">Piatto</span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Nome Eccellenza</Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="es. Tartare di Salmone" 
                  className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-yellow-400 focus:bg-white transition-all font-bold text-slate-800 shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Prezzo (€)</Label>
                  <div className="relative">
                    <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <Input 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="14.00" 
                      className="h-14 rounded-2xl bg-slate-50 border-transparent focus:border-yellow-400 focus:bg-white pl-10 transition-all font-black text-slate-800 shadow-inner"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                   <div className="p-4 bg-yellow-50 rounded-2xl flex items-center gap-2 text-yellow-700 text-[10px] font-bold uppercase italic">
                      <Sparkles size={14} /> Suggerito
                   </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Dettagli & Ingredienti</Label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-slate-300" size={16} />
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descrivi il sapore del piatto..." 
                    className="rounded-2xl bg-slate-50 border-transparent focus:border-yellow-400 focus:bg-white pl-10 min-h-24 transition-all font-medium text-slate-600 resize-none shadow-inner"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-slate-900 hover:bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.25em] shadow-xl hover:shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Sincronizzazione..." : <><Plus size={20} strokeWidth={3} /> Conferma Inserimento</>}
              </button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
