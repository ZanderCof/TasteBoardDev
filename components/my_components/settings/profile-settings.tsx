"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function ProfileSettings() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-slate-700 font-bold ml-1">Nome del Ristorante</Label>
          <Input defaultValue="Pizzeria da Mario" className="h-12 rounded-xl bg-white/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700 font-bold ml-1">Email di Contatto</Label>
          <Input defaultValue="info@damario.it" className="h-12 rounded-xl bg-white/50" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label className="text-slate-700 font-bold ml-1">Indirizzo Completo</Label>
          <Input defaultValue="Via Roma 12, Milano (MI)" className="h-12 rounded-xl bg-white/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700 font-bold ml-1">Telefono</Label>
          <Input defaultValue="+39 02 1234567" className="h-12 rounded-xl bg-white/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700 font-bold ml-1">P.IVA</Label>
          <Input defaultValue="IT12345678901" className="h-12 rounded-xl bg-white/50" />
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button className="bg-slate-900 hover:bg-red-600 text-white font-bold h-12 px-8 rounded-xl transition-all gap-2">
          <Save size={18} /> Salva Modifiche
        </Button>
      </div>
    </div>
  );
}
