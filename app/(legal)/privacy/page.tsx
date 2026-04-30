import { LegalLayout } from "@/components/my_components/legal/legal-layout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="24 Ottobre 2023">
      
      <p>
        In <strong>Tasteboard</strong>, la protezione dei dati del tuo ristorante è la nostra priorità assoluta. 
        Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo le informazioni che ci affidi quando utilizzi 
        il nostro sistema operativo per la ristorazione.
      </p>

      <h2>1. Raccolta dei dati</h2>
      <p>
        Raccogliamo esclusivamente le informazioni strettamente necessarie per fornire un servizio di gestione eccellente. 
        Questi dati includono:
      </p>
      <ul>
        <li><strong>Dati dell&apos;attività:</strong> Nome del locale, P.IVA, indirizzo e contatti aziendali.</li>
        <li><strong>Dati del personale:</strong> Nomi e ruoli dei dipendenti per la gestione dei turni e dei permessi.</li>
        <li><strong>Dati operativi:</strong> Inventario, bolle d&apos;acquisto e statistiche di vendita anonimizzate.</li>
      </ul>
      <p>
        <em>Nota bene:</em> Non vendiamo, affittiamo o condividiamo i tuoi dati con terze parti per finalità di marketing o profilazione commerciale.
      </p>
      
      <h2>2. Utilizzo delle informazioni</h2>
      <p>
        Utilizziamo le tue informazioni esclusivamente per scopi operativi legati al tuo abbonamento Tasteboard:
      </p>
      <ul>
        <li>Erogazione del menu digitale tramite QR Code.</li>
        <li>Generazione di reportistica accurata sul <strong>Food Cost</strong> e margini di guadagno.</li>
        <li>Sincronizzazione dei turni e comunicazione interna con la brigata.</li>
        <li>Invio di notifiche di servizio critiche (es. esaurimento scorte).</li>
      </ul>
      
      <h2>3. Protezione dei dati</h2>
      <p>
        La tua dashboard è protetta da standard di sicurezza di livello enterprise. Adottiamo la crittografia <strong>AES-256</strong> 
        per i dati a riposo e protocolli <strong>TLS/SSL</strong> per ogni trasmissione di informazioni. I backup sono eseguiti 
        quotidianamente su server ridondanti situati all&apos;interno dell&apos;Unione Europea (GDPR Compliant).
      </p>

      <h2>4. I tuoi diritti (GDPR)</h2>
      <p>
        In quanto titolare del trattamento per il tuo locale, hai il diritto di accedere, rettificare o cancellare i tuoi dati 
        in qualsiasi momento direttamente dalle impostazioni della tua dashboard o contattando il nostro team di supporto legale.
      </p>

    </LegalLayout>
  );
}
