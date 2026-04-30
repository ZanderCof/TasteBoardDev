// app/login/page.tsx

import { AuthLayout } from "@/components/my_components/auth/auth-layout";
import { RegisterForm } from "@/components/my_components/auth/register-form";


export default function LoginPage() {
  return (
    <AuthLayout 
      title="Benvenuto!" 
      subtitle="Accedi per gestire il tuo locale."
    >
      <RegisterForm />
    </AuthLayout>
  );
}