import { ComingSoonPlaceholder } from "@/components/my_components/ComingSoonPlaceholder";

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <ComingSoonPlaceholder featureName="Questa sezione" />
      {/* Opzionale: un tasto per tornare indietro se si sentono persi */}
      <p className="mt-8 text-slate-400 text-sm">
        Stiamo lavorando duramente per StartingLine.
      </p>
    </div>
  );
}
