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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenziali errate o abbonamento non attivo.");
      setLoading(false);
    } else {
      router.push("/dashboard");
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
              className="h-12 border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="https://vercel.app" className="text-xs font-bold text-red-600 hover:underline">
                Dimenticata?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="h-12 border-slate-200"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Accedi"}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Non hai un account StartingLine?{" "}
        <Link href="https://startingline-gamma.vercel.app/register" className="text-red-600 font-bold hover:underline">
          Registrati
        </Link>
      </p>
    </motion.div>
  );
}
