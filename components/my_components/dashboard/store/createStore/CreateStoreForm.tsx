"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Store, MapPin, Building2, Hash, Utensils, Coffee, Pizza, Beer, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createStore } from "@/app/(account)/(dashboard)/dashboard/store/actions";

const categories = [
  { id: "RESTAURANT", label: "Ristorante", icon: Utensils, color: "text-orange-500", bg: "bg-orange-50" },
  { id: "BAR", label: "Bar/Café", icon: Coffee, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "PIZZERIA", label: "Pizzeria", icon: Pizza, color: "text-red-500", bg: "bg-red-50" },
  { id: "PUB", label: "Pub/Birreria", icon: Beer, color: "text-yellow-600", bg: "bg-yellow-50" },
];

interface Props {
  onSuccess?: () => void;
}

export const CreateStoreForm = ({ onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    piva: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !selectedType) {
      toast.error("Inserisci almeno il nome e il tipo di attività");
      return;
    }

    try {
      setLoading(true);
      
      // Prepariamo i dati per Prisma unendo indirizzo e città se necessario
      const fullAddress = `${form.address}${form.city ? `, ${form.city}` : ""}`;

      const result = await createStore({
        name: form.name,
        type: selectedType,
        address: fullAddress,
        // Se hai aggiunto piva allo schema, passalo qui:
        // piva: form.piva 
      });

      if (result.success) {
        toast.success("Benvenuto su TasteBoard! Locale creato.");
        onSuccess?.();
      } else {
        toast.error(result.error || "Errore durante la creazione");
      }
    } catch (err) {
      toast.error("Errore critico durante l'invio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* SELEZIONE CATEGORIA */}
      <div className="space-y-3">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
          Tipo di attività
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(cat.id)}
              className={`
                cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center
                ${selectedType === cat.id 
                  ? "border-red-500 bg-red-50/30 shadow-sm" 
                  : "border-slate-100 bg-white hover:border-slate-200"}
              `}
            >
              <div className={`p-2.5 rounded-xl ${cat.bg} ${cat.color}`}>
                <cat.icon size={20} strokeWidth={2.5} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tight ${selectedType === cat.id ? "text-red-700" : "text-slate-500"}`}>
                {cat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* INPUT FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome</label>
          <div className="relative group">
            <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
            <input
              name="name"
              placeholder="Nome del locale"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Partita IVA</label>
          <div className="relative group">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
            <input
              name="piva"
              placeholder="11 cifre"
              value={form.piva}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-red-500/20 transition-all outline-none"
              maxLength={11}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Indirizzo Completo</label>
        <div className="flex gap-3">
          <div className="relative group flex-2 grow">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              name="address"
              placeholder="Via Roma 1"
              value={form.address}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-red-500/20 outline-none"
            />
          </div>
          <div className="relative group flex-1">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              name="city"
              placeholder="Città"
              value={form.city}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-red-500/20 outline-none"
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={loading || !selectedType || !form.name}
        className="w-full mt-4 bg-red-600 text-white py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-red-100 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none hover:bg-red-700 transition-all flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Creazione in corso...</span>
          </>
        ) : (
          "Attiva Locale"
        )}
      </motion.button>
    </form>
  );
};
