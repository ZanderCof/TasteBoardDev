export function WhyChooseUs() {
  const highlights = [
    { title: "Nessuna App da scaricare", desc: "Per i clienti basta inquadrare il QR col proprio telefono." },
    { title: "Multi-Lingua Automatico", desc: "Il tuo menu tradotto per i turisti in un click." },
    { title: "Sicurezza dei Dati", desc: "Tutti i tuoi dati di vendita sono protetti e crittografati." }
  ];

  return (
    <section className="py-20 bg-white/20 backdrop-blur-md border-y border-white/50">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {highlights.map((h, i) => (
          <div key={i} className="text-center space-y-3">
            <div className="text-red-600 font-black text-xl italic"># {i + 1}</div>
            <h4 className="text-xl font-bold text-slate-900">{h.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
