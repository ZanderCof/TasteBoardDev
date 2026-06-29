"use client";
// components/my_components/cliente/CategoryNav.tsx

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

export function CategoryNav({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  /* Scroll-spy via IntersectionObserver */
  useEffect(() => {
    if (categories.length === 0) return;

    const observers: IntersectionObserver[] = [];

    categories.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [categories]);

  /* Scrolla il pill attivo in vista nella navbar */
  useEffect(() => {
    const pill = pillRefs.current[activeId];
    const nav = navRef.current;
    if (!pill || !nav) return;
    const pillLeft = pill.offsetLeft;
    const pillWidth = pill.offsetWidth;
    const navWidth = nav.offsetWidth;
    nav.scrollTo({ left: pillLeft - navWidth / 2 + pillWidth / 2, behavior: "smooth" });
  }, [activeId]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 88; // altezza della sticky nav
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }

  if (categories.length === 0) return null;

  return (
    <div className="sticky top-0 z-30 bg-[#F8F7F5]/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm shadow-slate-100/60">
      <div
        ref={navRef}
        className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide"
      >
        {categories.map(({ id, name }) => {
          const active = activeId === id;
          return (
            <button
              key={id}
              ref={(el) => { pillRefs.current[id] = el; }}
              onClick={() => scrollToSection(id)}
              className={cn(
                "shrink-0 px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap",
                active
                  ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-800"
              )}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}