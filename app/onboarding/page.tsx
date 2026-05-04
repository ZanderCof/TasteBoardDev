"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { OnboardingWrapper } from "@/components/my_components/dashboard/onboarding/onboarding-wrapper";
import { StepInfo } from "@/components/my_components/dashboard/onboarding/step-info";
import { StepType } from "@/components/my_components/dashboard/onboarding/step-type";
import { saveBusinessAction } from "./actions";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
        // Invio dei dati tramite Server Action
        const result = await saveBusinessAction(
          session?.user?.id as string,
          formData
        );

        if (result && result.success) {
          // 1. Aggiorniamo la sessione locale
          await update({
            user: {
              ...session?.user,
              hasBusiness: true,
              businessName: formData.businessName,
            },
          });

          // 2. Redirect forzato con ricaricamento pagina
          // Fondamentale per far sì che il Middleware veda i nuovi dati
          window.location.href = "/dashboard";
        } else {
          alert("Errore nel salvataggio dei dati sull'Hub centrale.");
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Errore di rete durante l'onboarding:", e);
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50 py-12">
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
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="text-yellow-600 animate-spin" size={40} />
            </div>
            <h2 className="text-3xl font-black mb-4 tracking-tight text-slate-900">
              Quasi pronto!
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Stiamo configurando lo spazio per{" "}
              <strong>{formData.businessName}</strong>.
            </p>
          </div>
        )}

        <div className="flex gap-4 mt-12">
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
            disabled={
              isLoading || (currentStep === 1 && !formData.businessName)
            }
            className={`h-14 rounded-2xl font-bold shadow-lg transition-all duration-300
              ${
                currentStep === totalSteps
                  ? "bg-slate-900 hover:bg-slate-800 text-white flex-1"
                  : "bg-red-600 hover:bg-red-700 text-white flex-1 shadow-red-200"
              }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Salvataggio...
              </span>
            ) : (
              <>
                {currentStep === totalSteps
                  ? "Configurazione completata"
                  : "Continua"}
                {currentStep !== totalSteps && (
                  <ArrowRight size={18} className="ml-2" />
                )}
              </>
            )}
          </Button>
        </div>
      </OnboardingWrapper>
    </div>
  );
}
