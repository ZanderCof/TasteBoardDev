import { auth } from "@/auth"; // Importi direttamente la funzione auth
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/my_components/auth/auth-layout";
import { LoginForm } from "@/components/my_components/auth/login-form";

export default async function LoginPage() {
  // Con Auth.js v5 basta chiamare auth()
  const session = await auth();

  // Se la sessione esiste, redirect immediato
  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthLayout 
      title="Bentornato!" 
      subtitle="Accedi tramite il tuo account Nuviio per gestire il tuo locale."
    >
      <LoginForm />
    </AuthLayout>
  );
}
