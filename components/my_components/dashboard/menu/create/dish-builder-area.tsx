"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Utensils, Trash2, Edit3, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddDishModal } from "./AddDishModal";
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";
import { toast } from "sonner";

export function DishBuilderArea() {
  const { categories, activeCategoryId, removeDish } = useMenuStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCategory = categories.find((cat) => cat.id === activeCategoryId);

  if (!activeCategory) return null;

  const handleRemoveDish = (dishId: string, dishName: string) => {
    removeDish(activeCategory.id, dishId);
    toast.error(`Piatto rimosso`, {
      description: `${dishName} non è più nel menu.`,
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 min-h-150 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.04)] relative overflow-hidden"
        >
          {/* Sfondo Decorativo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-50/30 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />

          {/* HEADER SEZIONE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-red-100">
                  Sezione Attiva
                </span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                {activeCategory.name}
              </h2>
              <p className="text-slate-400 font-medium mt-2 flex items-center gap-2">
                <Utensils size={14} />
                {activeCategory.dishes.length} portate in questa categoria
              </p>
            </div>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 hover:bg-red-600 text-white rounded-2xl font-bold h-14 px-8 shadow-xl shadow-slate-200 gap-3 transition-all active:scale-95 grow sm:grow-0"
            >
              <Plus size={20} strokeWidth={3} /> Aggiungi Piatto
            </Button>
          </div>

          {/* LISTA PIATTI */}
          {activeCategory.dishes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
              <AnimatePresence>
                {activeCategory.dishes.map((dish) => (
                  <motion.div 
                    layout 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={dish.id} 
                    className="p-5 bg-slate-50/50 hover:bg-white border border-transparent hover:border-red-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-red-500/5 flex justify-between items-center group transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex p-2 bg-white rounded-xl border border-slate-100 text-slate-300">
                        <GripVertical size={16} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 leading-tight text-lg">{dish.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 font-bold text-base">
                            €{parseFloat(dish.price.toString()).toFixed(2)}
                          </span>
                          {dish.description && (
                            <span className="text-[10px] text-slate-400 font-medium truncate max-w-37.5">
                              • {dish.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="opacity-0 group-hover:opacity-100 p-2.5 text-slate-400 hover:text-slate-900 transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleRemoveDish(dish.id, dish.name)}
                        className="opacity-0 group-hover:opacity-100 p-2.5 bg-white text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl shadow-sm transition-all duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-24 bg-slate-50/30 rounded-[3rem] border-2 border-dashed border-slate-100">
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 3 }}
                className="relative mb-8"
              >
                <div className="absolute inset-0 bg-red-200 rounded-full blur-3xl opacity-30" />
                <div className="relative w-28 h-28 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-slate-200 border border-slate-50">
                  <Utensils size={40} className="text-slate-100" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Ancora nulla nel piatto?</h3>
              <p className="text-slate-500 text-center max-w-75 mt-3 mb-10 font-medium leading-relaxed">
                Inizia ad aggiungere le tue specialità per la sezione <span className="text-red-600 font-bold">{activeCategory.name}</span>.
              </p>
              
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-12 h-16 rounded-[1.5rem] font-bold shadow-2xl shadow-red-100 transition-all active:scale-95"
              >
                Crea la prima portata
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AddDishModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        categoryId={activeCategory.id}
      />
    </>
  );
}
