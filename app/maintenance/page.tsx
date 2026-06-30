import { fetchMaintenanceStatus } from "@/lib/nuviio-status";
import { TasteBoardLogo } from "@/components/my_components/logo";
import { Wrench } from "lucide-react";
import { MaintenancePoller } from "./MaintenancePoller";

export const dynamic = "force-dynamic";

const FALLBACK =
  "TasteBoard è momentaneamente in manutenzione. Torneremo online a breve, grazie per la pazienza.";

export default async function MaintenancePage() {
  const { message } = await fetchMaintenanceStatus();

  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 text-center font-jakarta overflow-hidden">
      {/* Glow di sfondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-red-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md">
        {/* Logo */}
        <TasteBoardLogo size="lg" href={null} light />

        {/* Icona */}
        <div className="w-20 h-20 rounded-3xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shadow-xl shadow-slate-950/40">
          <Wrench size={34} className="text-red-400" strokeWidth={1.5} />
        </div>

        {/* Testo */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-white tracking-tight">
            Manutenzione in corso
          </h1>
          <p className="text-slate-400 text-base leading-relaxed font-medium">
            {message ?? FALLBACK}
          </p>
        </div>

        {/* Indicatore "Aggiornamento automatico" */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 border border-slate-700/40 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Aggiornamento automatico ogni 60 s
          </span>
        </div>

        {/* Branding */}
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 pt-4">
          TasteBoard — Nuviio Ecosystem
        </p>
      </div>

      {/* Polling silenzioso: redirige a "/" quando la manutenzione termina */}
      <MaintenancePoller />
    </div>
  );
}
