"use client";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Utensils, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddDishModal } from "./AddDishModal";
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";
import { toast } from "sonner"; // Per dare feedback sull'eliminazione

export function DishBuilderArea() {
  // 1. Leggiamo lo stato e le azioni dallo store
  const { categories, activeCategoryId, removeDish } = useMenuStore();

  // 2. Troviamo la categoria attualmente selezionata
  const activeCategory = categories.find((cat) => cat.id === activeCategoryId);

  if (!activeCategory) return null;

  const handleRemoveDish = (dishId: string, dishName: string) => {
    removeDish(activeCategory.id, dishId);
    toast.info(`Piatto rimosso`, {
      description: `${dishName} è stato rimosso dalla lista.`
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white/60 backdrop-blur-xl rounded-[3.5rem] border border-white p-10 min-h-650px shadow-2xl shadow-slate-200/40 relative"
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {activeCategory.name}
            </h2>
            <p className="text-slate-400 font-medium mt-1">
              {activeCategory.dishes.length} {activeCategory.dishes.length === 1 ? 'portata' : 'portate'} in questa sezione
            </p>
          </div>
          
          <AddDishModal categoryId={activeCategory.id}>
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold h-12 px-6 shadow-lg shadow-red-100 gap-2">
              <PlusCircle size={20} /> Aggiungi Piatto
            </Button>
          </AddDishModal>
        </div>

        {activeCategory.dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCategory.dishes.map((dish) => (
              <motion.div 
                layout // Animazione fluida quando un elemento sparisce
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={dish.id} 
                className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group hover:border-red-200 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <h4 className="font-bold text-slate-900">{dish.name}</h4>
                  <p className="text-red-600 font-black text-sm">{dish.price}€</p>
                </div>
                
                <button 
                  onClick={() => handleRemoveDish(dish.id, dish.name)}
                  className="opacity-0 group-hover:opacity-100 p-2.5 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
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
              <span className="text-red-600 font-bold">{activeCategory.name}</span>.
            </p>
            <AddDishModal categoryId={activeCategory.id}>
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-red-600 text-white px-10 h-14 rounded-2xl font-black shadow-xl shadow-slate-200 transition-all active:scale-95"
              >
                Aggiungi la prima portata
              </Button>
            </AddDishModal>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
