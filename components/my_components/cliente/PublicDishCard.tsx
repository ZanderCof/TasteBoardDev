// components/my_components/cliente/PublicDishCard.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UtensilsCrossed } from "lucide-react";

interface PublicDishCardProps {
  name: string;
  price: number;
  description?: string;
  image?: string;
  available?: boolean;
}

export function PublicDishCard({
  name,
  price,
  description,
  image,
  available = true,
}: PublicDishCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 bg-white rounded-2xl border p-4 transition-all duration-200",
        available
          ? "border-slate-100 shadow-sm"
          : "border-slate-100 opacity-50 grayscale"
      )}
    >
      {/* Testo */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className={cn(
            "font-bold text-slate-900 leading-snug line-clamp-2",
            !available && "line-through decoration-slate-400"
          )}>
            {name}
          </h3>

          {/* Badge terminato */}
          {!available && (
            <span className="shrink-0 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
              <UtensilsCrossed size={9} />
              Terminato
            </span>
          )}
        </div>

        {description && (
          <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <p className={cn(
          "font-black text-base tracking-tight",
          available ? "text-slate-900" : "text-slate-400"
        )}>
          €{price.toFixed(2)}
        </p>
      </div>

      {/* Immagine / placeholder */}
      <div className="shrink-0 w-20 h-20 aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            sizes="80px"
            loading="lazy"
            className="object-cover w-full h-full"
          />
        ) : (
          <UtensilsCrossed size={20} className="text-slate-200" />
        )}
      </div>
    </div>
  );
}