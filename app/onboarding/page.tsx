"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Fondamentale per il reindirizzamento
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { OnboardingWrapper } from "@/components/my_components/dashboard/onboarding/onboarding-wrapper";
import { StepInfo } from "@/components/my_components/dashboard/onboarding/step-info";
import { StepType } from "@/components/my_components/dashboard/onboarding/step-type";
import { motion } from "motion/react";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Stato per il caricamento finale
  const totalSteps = 3;

  const nextStep = async () => {
    if (currentStep === totalSteps) {
      // LOGICA FINALE
      setIsLoading(true);
      
      // Simuliamo un salvataggio dei dati al database (es. 2 secondi)
      // Qui in futuro metterai la tua fetch o server action
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIsLoading(false);
      router.push("/dashboard"); // Vai alla dashboard
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50">
      <OnboardingWrapper step={currentStep} totalSteps={totalSteps}>
        
        {/* Renderizzazione condizionale degli Step */}
        {currentStep === 1 && <StepInfo />}
        {currentStep === 2 && <StepType />}
        {currentStep === 3 && (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="text-yellow-600 animate-spin" size={40} />
            </div>
            <h2 className="text-3xl font-black mb-4 tracking-tight text-slate-900">
              Quasi pronto!
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Stiamo configurando il tuo spazio di lavoro e preparando <br /> 
              i tuoi primi <strong>QR Code</strong> personalizzati.
            </p>
          </div>
        )}

        {/* Pulsanti di Navigazione */}
        <div className="flex gap-4 mt-12">
          {currentStep > 1 && !isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                className="w-full h-14 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                <ArrowLeft size={18} className="mr-2" /> Indietro
              </Button>
            </motion.div>
          )}

          <Button 
            onClick={nextStep} 
            disabled={isLoading} // Disabilita durante il caricamento
            className={`h-14 rounded-2xl font-bold shadow-lg transition-all duration-300
              ${currentStep === totalSteps 
                ? "bg-slate-900 hover:bg-slate-800 text-white flex-1" 
                : "bg-red-600 hover:bg-red-700 text-white flex-[2] shadow-red-200"
              }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Salvataggio...
              </span>
            ) : (
              <>
                {currentStep === totalSteps ? "Configurazione completata" : "Continua"}
                {currentStep !== totalSteps && <ArrowRight size={18} className="ml-2" />}
              </>
            )}
          </Button>
        </div>

      </OnboardingWrapper>
    </div>
  );
}
