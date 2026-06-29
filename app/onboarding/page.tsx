"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, PartyPopper } from "lucide-react";
import { OnboardingWrapper } from "@/components/my_components/dashboard/onboarding/onboarding-wrapper";
import { StepInfo } from "@/components/my_components/dashboard/onboarding/step-info";
import { StepType } from "@/components/my_components/dashboard/onboarding/step-type";
import { saveBusinessAction } from "./actions";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    type: "",
    logo: "",
  });

  const updateFields = (fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = async () => {
    if (currentStep === totalSteps) {
      setIsLoading(true);

      try {
        // Chiamata all'action con i due parametri corretti: ID e Dati
        const result = await saveBusinessAction(session?.user?.id as string, formData);

        if (result?.success) {
          // Aggiorniamo la sessione lato client per riflettere lo stato "hasBusiness"
          await update({
            ...session,
            user: {
              ...session?.user,
              hasBusiness: true,
            },
          });

          setIsLoading(false);
          setIsSuccess(true);

          // Piccola pausa per mostrare il messaggio di completamento prima del redirect
          setTimeout(() => {
            window.location.assign("/dashboard/menu");
          }, 1200);
        } else {
          alert(result?.error || "Errore nel salvataggio.");
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Errore critico onboarding:", e);
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4">
      <OnboardingWrapper step={currentStep} totalSteps={totalSteps}>
        
        {currentStep === 1 && (
          <StepInfo
            businessName={formData.businessName}
            address={formData.address}
            updateFields={updateFields}
          />
        )}

        {currentStep === 2 && (
          <StepType type={formData.type} updateFields={updateFields} />
        )}

        {currentStep === 3 && (
          <div className="text-center py-8 space-y-4">
            {isSuccess ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle2 className="text-green-600" size={40} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-slate-900">
                  Creazione completata!
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                  Stiamo per reindirizzarti alla dashboard di{" "}
                  <span className="text-slate-900 font-bold">{formData.businessName || "il tuo locale"}</span>.
                </p>
              </>
            ) : isLoading ? (
              <>
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Loader2 className="text-yellow-600 animate-spin" size={40} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-slate-900">
                  Quasi pronto!
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                  Stiamo configurando lo spazio digitale per{" "}
                  <span className="text-slate-900 font-bold">{formData.businessName || "il tuo locale"}</span>.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <PartyPopper className="text-slate-700" size={40} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-slate-900">
                  Tutto pronto!
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                  Premi &quot;Concludi e inizia&quot; per creare lo spazio digitale di{" "}
                  <span className="text-slate-900 font-bold">{formData.businessName || "il tuo locale"}</span>.
                </p>
              </>
            )}
          </div>
        )}

        {!isSuccess && (
          <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-12">
            {currentStep > 1 && !isLoading && (
              <div className="flex-1">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="w-full h-14 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  <ArrowLeft size={18} className="mr-2" /> Indietro
                </Button>
              </div>
            )}

            <Button
              onClick={nextStep}
              disabled={isLoading || (currentStep === 1 && !formData.businessName)}
              className={`h-14 rounded-2xl font-bold shadow-lg transition-all duration-500 flex-1
                ${
                  currentStep === totalSteps
                    ? "bg-slate-900 hover:bg-black text-white"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
                }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} /> Configurazione in corso...
                </span>
              ) : (
                <>
                  {currentStep === totalSteps ? "Concludi e inizia" : "Continua"}
                  {currentStep !== totalSteps && <ArrowRight size={18} className="ml-2" />}
                </>
              )}
            </Button>
          </div>
        )}
      </OnboardingWrapper>
    </div>
  );
}
