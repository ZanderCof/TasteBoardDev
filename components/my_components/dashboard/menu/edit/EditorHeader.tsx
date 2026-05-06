"use client";

import { updateMenuName, deleteMenu } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowLeft, Save, Trash2, Edit3, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function EditorHeader({ title, menuId }: { title: string, menuId: string }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSave = () => {
    startTransition(async () => {
      await updateMenuName(menuId, currentTitle);
      setIsEditing(false);
    });
  };

  const handleDelete = async () => {
    if (confirm("Sei sicuro di voler eliminare definitivamente questo menu?")) {
      await deleteMenu(menuId);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-jakarta">
      {/* LEFT SIDE: Back & Title */}
      <div className="flex items-center gap-5">
        <button 
          onClick={() => router.back()}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-600 hover:border-red-100 hover:shadow-xl hover:shadow-red-500/5 transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="relative group flex flex-col">
          <p className="text-[10px] font-black uppercase text-red-500 tracking-[0.25em] mb-1">Editor Menu</p>
          <div className="flex items-center gap-3">
            <input 
              value={currentTitle}
              readOnly={!isEditing}
              onFocus={() => setIsEditing(true)}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className={cn(
                "bg-transparent text-3xl md:text-4xl font-black tracking-tighter focus:outline-none transition-all border-b-2",
                isEditing 
                  ? "text-slate-900 border-yellow-400" 
                  : "text-slate-800 border-transparent cursor-default"
              )}
            />
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-yellow-500 transition-all"
              >
                <Edit3 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={handleDelete}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-slate-400 font-bold text-sm hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <Trash2 size={18} />
          <span className="hidden sm:inline">Elimina</span>
        </button>

        <button 
          onClick={handleSave}
          disabled={isPending}
          className={cn(
            "flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg",
            isEditing || currentTitle !== title
              ? "bg-slate-900 text-white shadow-slate-200 hover:bg-black hover:-translate-y-0.5 active:scale-95"
              : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
          )}
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isEditing || currentTitle !== title ? (
            <Save size={18} />
          ) : (
            <CheckCircle2 size={18} className="text-emerald-500" />
          )}
          <span>{isPending ? "Salvataggio..." : isEditing || currentTitle !== title ? "Salva" : "Salvato"}</span>
        </button>
      </div>
    </div>
  );
}
