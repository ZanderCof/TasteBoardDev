// components/my_components/cliente/PublicHeader.tsx
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";

interface PublicHeaderProps {
  restaurantName: string;
  logo?: string;
  totalDishes?: number;
  categoriesCount?: number;
}

export function PublicHeader({
  restaurantName,
  logo,
  totalDishes,
  categoriesCount,
}: PublicHeaderProps) {
  return (
    <header className="relative bg-slate-900 overflow-hidden">
      {/* Pattern di sfondo */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[18px_18px]" />
      {/* Glow rosso */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-red-600/10 rounded-full blur-[60px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-5 pt-8 sm:pt-10 pb-6 sm:pb-8 flex flex-col items-center text-center gap-4">
        {/* Logo o icona fallback */}
        {logo ? (
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <Image src={logo} alt={restaurantName} width={64} height={64} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <UtensilsCrossed size={22} className="text-white/40" />
          </div>
        )}

        {/* Nome ristorante */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 mb-1">
            Menu
          </p>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-white leading-none wrap-break-word">
            {restaurantName}
          </h1>
        </div>

        {/* Stats pill */}
        {(totalDishes !== undefined || categoriesCount !== undefined) && (
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            {categoriesCount !== undefined && (
              <span className="text-[11px] font-bold text-white/50">
                {categoriesCount} {categoriesCount === 1 ? "sezione" : "sezioni"}
              </span>
            )}
            {categoriesCount !== undefined && totalDishes !== undefined && (
              <span className="text-white/20 mx-1">·</span>
            )}
            {totalDishes !== undefined && (
              <span className="text-[11px] font-bold text-white/50">
                {totalDishes} {totalDishes === 1 ? "piatto" : "piatti"}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}