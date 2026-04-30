import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    { q: "Cosa succede se finisco un ingrediente durante il servizio?", a: "Puoi nascondere il piatto dal menu istantaneamente dalla tua dashboard mobile. Il QR code rimarrà lo stesso, ma i clienti non vedranno più quel piatto." },
    { q: "I clienti devono scaricare un'app?", a: "Assolutamente no. Tasteboard funziona tramite browser mobile: basta inquadrare il QR code con la fotocamera dello smartphone." },
    { q: "Posso gestire più punti vendita?", a: "Sì, il piano Pro permette la gestione multi-tenant per catene di ristoranti o franchising con un'unica dashboard centralizzata." },
    { q: "È prevista assistenza per la configurazione iniziale?", a: "Offriamo supporto tramite chat e video-guide per aiutarti a caricare il tuo primo menu in meno di 10 minuti." }
  ];

  return (
    <section className="py-24 bg-white/30 backdrop-blur-md">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900">Domande <span className="text-red-600 italic underline decoration-yellow-400">Frequenti</span></h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white/50 backdrop-blur-sm border border-white px-6 rounded-[1.5rem] shadow-sm overflow-hidden">
              <AccordionTrigger className="text-left font-bold text-slate-800 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
