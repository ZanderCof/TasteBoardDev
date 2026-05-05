"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          {error && (
            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
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

      <p className="text-center text-sm text-slate-500">
        Non hai un account?{" "}
        <Link href="/register" className="text-red-600 font-bold hover:underline">
          Registrati
        </Link>
      </p>
    </motion.div>
  );
}
