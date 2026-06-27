"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// DEFINIZIONE DELLE PROPS
interface StepInfoProps {
  businessName: string;
  address: string;
  updateFields: (fields: {
    businessName?: string;
    address?: string;
    logo?: string;
  }) => void;
}

export function StepInfo({
  businessName,
  address,
  updateFields,
}: StepInfoProps) {
  const [image, setImage] = useState<string | null>(null);
  const MAX_LOGO_SIZE = 3 * 1024 * 1024; // 3MB: in base64 diventa ~4MB, entro il bodySizeLimit della Server Action

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_LOGO_SIZE) {
      alert("Il logo è troppo grande (max 3MB). Scegli una foto più leggera o comprimila prima di caricarla.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);
      updateFields({ logo: base64 }); // Passiamo il logo al padre
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center mb-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Benvenuto su <span className="text-red-600">Tasteboard</span>
        </h2>
        <p className="text-slate-500">
          Iniziamo con le informazioni base del tuo locale.
        </p>
      </div>

      {/* UPLOAD LOGO */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-red-400 group-hover:bg-red-50">
            <AnimatePresence mode="wait">
              {image ? (
                <motion.img
                  key="preview"
                  src={image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-slate-400 group-hover:text-red-500"
                >
                  <Camera size={28} strokeWidth={1.5} />
                  <span className="text-[10px] font-bold uppercase mt-2">
                    Aggiungi Logo
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          {image && (
            <button
              onClick={() => {
                setImage(null);
                updateFields({ logo: "" });
              }}
              className="absolute -top-2 -right-2 bg-slate-900 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-20"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
          Consigliato: Quadrato 500x500px · Max 3MB
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="restaurantName" className="font-bold text-slate-700">
            Nome del Locale
          </Label>
          <Input
            id="restaurantName"
            name="businessName" // <--- AGGIUNGI QUESTO
            value={businessName}
            onChange={(e) => updateFields({ businessName: e.target.value })}
            placeholder="es. Pizzeria da Mario"
            className="h-12 rounded-xl border-slate-200 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address" className="font-bold text-slate-700">
            Indirizzo
          </Label>
          <Input
            id="address"
            name="address" // <--- AGGIUNGI QUESTO
            value={address}
            onChange={(e) => updateFields({ address: e.target.value })}
            placeholder="Via Roma 1, Milano"
            className="h-12 rounded-xl border-slate-200 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );
}
