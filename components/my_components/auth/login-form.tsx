// components/auth/login-form.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";

export function LoginForm() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nome@mail.it" className="h-12 border-slate-200" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs font-bold text-red-600 hover:underline">Dimenticata?</Link>
          </div>
          <Input id="password" type="password" className="h-12 border-slate-200" />
        </div>
      </div>
      <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl">
        Accedi
      </Button>
      <p className="text-center text-sm text-slate-500">
        Non hai un account StartingLine?{" "}
        <Link href="https://startingline-gamma.vercel.app/register" className="text-red-600 font-bold hover:underline">Registrati</Link>
      </p>
    </motion.div>
  );
}
