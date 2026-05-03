"use client";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddDishModal } from "./AddDishModal";

export function DishBuilderArea({ activeTab }: { activeTab: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white/60 backdrop-blur-xl rounded-[3.5rem] border border-white p-10 min-h-[650px] shadow-2xl shadow-slate-200/40 relative"
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {activeTab}
            </h2>
            <p className="text-slate-400 font-medium mt-1">
              Gestisci le portate di questa categoria
            </p>
          </div>
          <AddDishModal>
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold h-12 px-6 shadow-lg shadow-red-100 gap-2">
              <PlusCircle size={20} /> Aggiungi Piatto
            </Button>
          </AddDishModal>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-28 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50" />
            <div className="relative w-24 h-24 bg-white rounded-full shadow-inner flex items-center justify-center text-slate-200">
              <Utensils size={48} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-800">
            Vuoto come un piatto pulito
          </h3>
          <p className="text-slate-400 text-center max-w-[320px] mt-3 mb-10 font-medium">
            Inizia a creare il tuo capolavoro culinario per la sezione{" "}
            <span className="text-red-600 font-bold">{activeTab}</span>.
          </p>
          <AddDishModal>
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-red-600 text-white px-10 h-14 rounded-2xl font-black shadow-xl shadow-slate-200 transition-all active:scale-95"
            >
              Aggiungi la prima portata
            </Button>
          </AddDishModal>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
