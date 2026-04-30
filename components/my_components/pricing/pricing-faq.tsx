// components/my_components/pricing/pricing-faq.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function PricingFaq() {
  const faqs = [
    { q: "Posso cambiare piano in ogni momento?", a: "Certamente. Puoi passare da un piano all'altro direttamente dalla tua dashboard. La differenza verrà calcolata proporzionalmente." },
    { q: "C'è un periodo di prova gratuito?", a: "Sì, offriamo 14 giorni di prova gratuita su tutti i piani, senza dover inserire i dati della carta." },
    { q: "Cosa succede se decido di disdire?", a: "Puoi disdire quando vuoi con un click. Avrai accesso alle funzioni fino alla fine del periodo già pagato." }
  ];

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h2 className="text-2xl font-black text-center mb-10 text-slate-900">Domande sui Pagamenti</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="bg-white/40 backdrop-blur-sm border border-white px-6 rounded-2xl shadow-sm">
            <AccordionTrigger className="text-left font-bold text-slate-800">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-slate-600">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
