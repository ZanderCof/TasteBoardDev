"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const googleError =
    searchParams.get("error") === "AccessDenied"
      ? "Nessun abbonamento TasteBoard attivo per questo account Google."
      : "";
  const displayedError = error || googleError;

  function handleGoogleSignIn() {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Eseguiamo il login
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenziali errate o abbonamento non attivo.");
      setLoading(false);
    } else {
      // Usiamo replace per non permettere di tornare indietro col tasto del browser
      router.replace("/dashboard");
      router.refresh();
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {displayedError && (
            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg border border-red-100">
              {displayedError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="nome@mail.it"
              className="h-12 border-slate-200 focus:border-red-600 focus:ring-red-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs font-bold text-red-600 hover:underline">
                Dimenticata?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 border-slate-200 focus:border-red-600 focus:ring-red-600"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl transition-all active:scale-[0.98]"
        >
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Accedi"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400 uppercase">oppure</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={googleLoading}
        onClick={handleGoogleSignIn}
        className="w-full h-12 border-slate-200 font-bold rounded-xl"
      >
        {googleLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H1.49v2.84C3.29 20.53 7.31 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H1.49C.54 8.86 0 10.88 0 13s.54 4.14 1.49 5.94l3.16-2.46.19-2.38z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.31 1 3.29 3.47 1.49 7.06l4.35 3.38C6.71 7.84 9.14 5.38 12 5.38z" />
          </svg>
        )}
        Accedi con Google
      </Button>

      <p className="text-center text-sm text-slate-500">
        Non hai un account?{" "}
        <Link href="/register" className="text-red-600 font-bold hover:underline">
          Registrati
        </Link>
      </p>
    </motion.div>
  );
}
