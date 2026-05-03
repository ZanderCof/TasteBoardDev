"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Camera, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

const ALLERGENS = ["Glutine", "Lattosio", "Uova", "Frutta a guscio", "Crostacei", "Pesce", "Soia"];

export function AddDishModal({ children }: { children: React.ReactNode }) {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
        <DialogHeader className="p-8 bg-slate-900 text-white">
          <DialogTitle className="text-2xl font-black italic tracking-tight">
            Aggiungi un <span className="text-yellow-400">piatto</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* UPLOAD FOTO PIATTO */}
          <div className="flex justify-center">
            <div className="relative w-full h-48 rounded-[2rem] bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group hover:border-red-400 transition-all">
              {image ? (
                <>
                  <Image src={image} alt="Preview" fill className="object-cover" unoptimized />
                  <button onClick={() => setImage(null)} className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full"><X size={16}/></button>
                </>
              ) : (
                <div className="flex flex-col items-center text-slate-400 group-hover:text-red-500 transition-colors">
                  <Camera size={32} strokeWidth={1.5} />
                  <span className="text-[10px] font-black uppercase mt-2">Carica foto del piatto</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Nome del Piatto</Label>
              <Input placeholder="es. Carbonara Reale" className="h-12 rounded-xl" />
            </div>
            
            <div className="space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Prezzo (€)</Label>
              <Input type="number" placeholder="12.00" className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Categoria</Label>
              <Input disabled value="Primi" className="h-12 rounded-xl bg-slate-50" />
            </div>

            <div className="col-span-2 space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Descrizione / Ingredienti</Label>
              <Textarea placeholder="Descrivi il gusto unico di questa portata..." className="rounded-xl min-h-[100px] resize-none" />
            </div>
          </div>

          {/* ALLERGENI SELECTION */}
          <div className="space-y-3">
            <Label className="font-bold text-slate-700 ml-1 uppercase text-[10px] tracking-widest">Allergeni</Label>
            <div className="flex flex-wrap gap-2">
              {ALLERGENS.map((allergen) => (
                <button
                  key={allergen}
                  onClick={() => toggleAllergen(allergen)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedAllergens.includes(allergen)
                      ? "bg-red-600 text-white shadow-md shadow-red-200 scale-105"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 flex gap-3">
          <Button variant="ghost" className="rounded-xl font-bold text-slate-500">Annulla</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-red-200 flex-1">
            Salva nel Menu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
