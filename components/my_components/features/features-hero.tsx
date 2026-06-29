// components/my_components/features/features-hero.tsx
export function FeaturesHero() {
  return (
    <section className="py-20 text-center container mx-auto px-6 max-w-4xl">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-black uppercase tracking-widest mb-6">
        Semplicità & Controllo
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-6">
        Tutto quello che serve <br />
        <span className="text-red-600 italic">a chi lavora nella ristorazione.</span>
      </h1>

      <p className="text-xl text-slate-500 font-medium">
        Dal menu digitale all’analisi delle vendite: ogni funzione è progettata per semplificarti il lavoro e aumentare l’efficienza del tuo locale.
      </p>
    </section>
  );
}