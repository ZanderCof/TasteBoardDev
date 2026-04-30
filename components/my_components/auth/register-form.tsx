// components/auth/register-form.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";

export function RegisterForm() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="restaurant">Nome Attività</Label>
        <Input id="restaurant" placeholder="es. Pizzeria Bella Napoli" className="h-12 border-slate-200" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Professionale</Label>
        <Input id="email" type="email" placeholder="contatto@ristorante.it" className="h-12 border-slate-200" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Minimo 8 caratteri" className="h-12 border-slate-200" />
      </div>
      <div className="pt-4">
        <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-red-100">
          Crea account gratis
        </Button>
      </div>
      <p className="text-center text-sm text-slate-500">
        Hai già un account?{" "}
        <Link href="/login" className="text-red-600 font-bold hover:underline">Accedi</Link>
      </p>
    </motion.div>
  );
}
