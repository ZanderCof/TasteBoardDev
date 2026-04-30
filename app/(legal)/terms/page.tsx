import { LegalLayout } from "@/components/my_components/legal/legal-layout";

export default function TerminiPage() {
  return (
    <LegalLayout title="Termini di Servizio" lastUpdated="Ottobre 2023">
      <h2>1. Accettazione dei Termini</h2>
      <p>Registrandoti a Tasteboard, accetti di utilizzare la piattaforma nel rispetto delle leggi vigenti nel settore della ristorazione e del commercio.</p>
      
      <h2>2. Abbonamenti e Pagamenti</h2>
      <p>I pagamenti sono mensili o annuali. La mancata ricezione del pagamento comporterà la sospensione temporanea dell&apos;accesso alla dashboard.</p>
      
      <h2>3. Responsabilità</h2>
      <p>Tasteboard è uno strumento di supporto. Il ristoratore rimane l&apos;unico responsabile della correttezza dei prezzi esposti e della gestione dei propri dipendenti.</p>
    </LegalLayout>
  );
}
