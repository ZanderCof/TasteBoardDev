export const CATEGORY_OPTIONS = [
  { value: "GESTIONE_MENU", label: "Gestione Menu" },
  { value: "PAGAMENTO", label: "Pagamento" },
  { value: "PRENOTAZIONI", label: "Prenotazioni" },
  { value: "ACCOUNT", label: "Account" },
  { value: "ALTRO", label: "Altro" },
] as const;

export const PRIORITY_OPTIONS = [
  { value: "LOW", label: "Bassa" },
  { value: "MEDIUM", label: "Media" },
  { value: "HIGH", label: "Alta" },
  { value: "URGENT", label: "Urgente" },
] as const;

export const STATUS_LABELS: Record<string, string> = {
  OPEN: "Aperto",
  IN_PROGRESS: "In lavorazione",
  RESOLVED: "Risolto",
  CLOSED: "Chiuso",
};

export const STATUS_STYLES: Record<string, string> = {
  OPEN: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
};

export function categoryLabel(value: string) {
  return CATEGORY_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}

export function priorityLabel(value: string) {
  return PRIORITY_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}
