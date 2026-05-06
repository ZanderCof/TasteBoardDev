import { Plus, GripVertical } from 'lucide-react';

export function CategorySection({ name, children }: { name: string, children: React.ReactNode }) {
  return (
    <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-8 mb-8 shadow-sm relative overflow-hidden">
      {/* Accento Giallo Brand */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <GripVertical className="text-slate-300 cursor-grab" />
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{name}</h3>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-white transition-all">
          <Plus size={16} /> Aggiungi Piatto
        </button>
      </div>
      
      <div className="grid gap-4">
        {children}
      </div>
    </div>
  );
}
