"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";

interface AddDishModalProps {
  children: React.ReactNode;
  categoryId: string; // <--- Aggiungiamo questa prop per risolvere l'errore TS
}

export function AddDishModal({ children, categoryId }: AddDishModalProps) {
  const [open, setOpen] = useState(false);
  const addDish = useMenuStore((state) => state.addDish);

  // Stati del form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !price) return;

    // Aggiungiamo il piatto allo store globale
    addDish(categoryId, {
      name,
      price: price, // lo store si aspetta una stringa o numero in base a come lo hai tipizzato
    });

    // Reset e chiusura
    setName("");
    setPrice("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25 rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic">Aggiungi Piatto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold ml-1">Nome del piatto</Label>
            <Input
              id="name"
              placeholder="es. Carbonara Classica"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-slate-200 focus:border-red-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price" className="font-bold ml-1">Prezzo (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.50"
              placeholder="12.50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl border-slate-200"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-red-600 text-white h-12 rounded-xl font-bold transition-all"
          >
            Salva nel menu
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
