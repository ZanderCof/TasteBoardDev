export function ComparisonTable() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16 italic">
          Perché passare al <span className="text-yellow-400">digitale?</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
          {/* Vecchio Metodo */}
          <div className="bg-slate-900 p-10 space-y-8 opacity-60">
            <h3 className="text-xl font-bold uppercase tracking-widest text-slate-400">Menu Cartaceo</h3>
            <ul className="space-y-6">
              <li className="flex gap-3 text-sm italic">❌ Giorni d&apos;attesa per la stampa</li>
              <li className="flex gap-3 text-sm italic">❌ Costi fissi ad ogni modifica</li>
              <li className="flex gap-3 text-sm italic">❌ Menu usurati o sporchi</li>
              <li className="flex gap-3 text-sm italic">❌ Zero dati sui piatti preferiti</li>
            </ul>
          </div>

          {/* Tasteboard */}
          <div className="bg-red-600 p-10 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 text-white/20 font-black text-6xl italic -rotate-12">FAST</div>
             <h3 className="text-xl font-bold uppercase tracking-widest text-white">Tasteboard</h3>
             <ul className="space-y-6">
              <li className="flex gap-3 text-sm font-bold items-center">
                <div className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px]">✓</div>
                Aggiornamenti in 2 secondi
              </li>
              <li className="flex gap-3 text-sm font-bold items-center">
                <div className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px]">✓</div>
                Modifiche illimitate e gratis
              </li>
              <li className="flex gap-3 text-sm font-bold items-center">
                <div className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px]">✓</div>
                Design sempre impeccabile
              </li>
              <li className="flex gap-3 text-sm font-bold items-center">
                <div className="w-5 h-5 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-[10px]">✓</div>
                Analisi vendite in tempo reale
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
