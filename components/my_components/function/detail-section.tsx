// components/my_components/features/detail-section.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type DetailSectionProps = {
  title: string;
  subtitle: string;
  image: string;
  features: string[];
  reversed?: boolean;
};

export function DetailSection({ title, subtitle, image, features, reversed }: DetailSectionProps) {
  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
      
      <div className="flex-1 space-y-6">
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
          {title}
        </h3>

        <p className="text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>

        <ul className="space-y-3">
          {features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-3 font-bold text-slate-800">
              <CheckCircle2 className="text-red-600" size={20} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="flex-1 w-full h-[400px] rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl relative"
      >
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent" />
      </motion.div>
    </div>
  );
}