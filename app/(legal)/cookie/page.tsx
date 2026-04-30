import { LegalLayout } from "@/components/my_components/legal/legal-layout";

export default function CookiePage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="Ottobre 2023">
      <h2>Cosa sono i cookie?</h2>
      <p>I cookie sono piccoli file di testo salvati sul tuo dispositivo per migliorare l&apos;esperienza utente su Tasteboard.</p>
      
      <h2>Cookie Tecnici</h2>
      <p>Essenziali per il funzionamento della dashboard e per mantenerti loggato durante la sessione di lavoro.</p>
      
      <h2>Cookie Analitici</h2>
      <p>Utilizziamo strumenti anonimi per capire come i ristoratori interagiscono con la piattaforma e migliorare le funzionalità.</p>
    </LegalLayout>
  );
}
