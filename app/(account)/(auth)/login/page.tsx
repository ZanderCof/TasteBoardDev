import { AuthLayout } from "@/components/my_components/auth/auth-layout";
import { LoginForm } from "@/components/my_components/auth/login-form";


export default function LoginPage() {
  return (
    <AuthLayout 
      title="Bentornato!" 
      subtitle="Accedi tramite il tuo account StartingLine per gestire il tuo locale."
    >
      <LoginForm />
    </AuthLayout>
  );
}
