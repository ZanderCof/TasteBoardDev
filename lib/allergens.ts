export interface Allergen {
  id: string;
  label: string;
  emoji: string;
  bg: string;       // Tailwind bg-* class
  text: string;     // Tailwind text-* class
  border: string;   // Tailwind border-* class
}

export const ALLERGENS: Allergen[] = [
  { id: "gluten",      label: "Glutine",     emoji: "🌾", bg: "bg-amber-100",   text: "text-amber-800",  border: "border-amber-300"  },
  { id: "crustaceans", label: "Crostacei",   emoji: "🦐", bg: "bg-orange-100",  text: "text-orange-800", border: "border-orange-300"  },
  { id: "eggs",        label: "Uova",        emoji: "🥚", bg: "bg-yellow-100",  text: "text-yellow-800", border: "border-yellow-300"  },
  { id: "fish",        label: "Pesce",       emoji: "🐟", bg: "bg-blue-100",    text: "text-blue-800",   border: "border-blue-300"    },
  { id: "peanuts",     label: "Arachidi",    emoji: "🥜", bg: "bg-lime-100",    text: "text-lime-800",   border: "border-lime-300"    },
  { id: "soy",         label: "Soia",        emoji: "🫘", bg: "bg-green-100",   text: "text-green-800",  border: "border-green-300"   },
  { id: "milk",        label: "Latte",       emoji: "🥛", bg: "bg-sky-100",     text: "text-sky-800",    border: "border-sky-300"     },
  { id: "nuts",        label: "Frutta a guscio", emoji: "🌰", bg: "bg-stone-100", text: "text-stone-800", border: "border-stone-300"  },
  { id: "celery",      label: "Sedano",      emoji: "🌿", bg: "bg-emerald-100", text: "text-emerald-800",border: "border-emerald-300"  },
  { id: "mustard",     label: "Senape",      emoji: "🌻", bg: "bg-yellow-50",   text: "text-yellow-700", border: "border-yellow-200"  },
  { id: "sesame",      label: "Sesamo",      emoji: "🫙", bg: "bg-orange-50",   text: "text-orange-700", border: "border-orange-200"  },
  { id: "sulphites",   label: "Solfiti",     emoji: "🍷", bg: "bg-violet-100",  text: "text-violet-800", border: "border-violet-300"  },
  { id: "lupin",       label: "Lupini",      emoji: "🫛", bg: "bg-teal-100",    text: "text-teal-800",   border: "border-teal-300"    },
  { id: "molluscs",    label: "Molluschi",   emoji: "🦪", bg: "bg-cyan-100",    text: "text-cyan-800",   border: "border-cyan-300"    },
];

export const ALLERGEN_MAP = new Map(ALLERGENS.map((a) => [a.id, a]));

export function getAllergen(id: string): Allergen | undefined {
  return ALLERGEN_MAP.get(id);
}
