"use client";
import { cn } from "@/lib/utils";

interface CategoryScrollerProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryScroller({ categories, activeCategory, onSelect }: CategoryScrollerProps) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 overflow-x-auto no-scrollbar py-3 px-4">
      <div className="flex gap-2">
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all",
              activeCategory === cat 
                ? "bg-red-600 text-white shadow-lg shadow-red-100 scale-105" 
                : "bg-slate-100 text-slate-500"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
