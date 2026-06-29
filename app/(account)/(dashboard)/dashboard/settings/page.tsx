"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsNav } from "@/components/my_components/settings/settings-nav";
import { ProfileSettings } from "@/components/my_components/settings/profile-settings";
import { AppearanceSettings } from "@/components/my_components/settings/appearance-settings";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="max-w-[1200px] mx-auto space-y-10">
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Impostazioni</h1>
        <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base md:text-lg">Gestisci il cuore pulsante del tuo locale.</p>
      </header>

      <div className="grid lg:grid-cols-[300px_1fr] gap-10 items-start">
        <SettingsNav activeSection={activeSection} setActiveSection={setActiveSection} />

        <motion.div 
          key={activeSection}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/60 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[3rem] p-4 sm:p-8 md:p-12 border border-white shadow-2xl shadow-slate-200/40"
        >
          <h2 className="text-2xl font-black text-slate-900 mb-8 capitalize">
            {activeSection.replace("-", " ")}
          </h2>

          <AnimatePresence mode="wait">
            {activeSection === "profile" && <ProfileSettings />}
            {activeSection === "appearance" && <AppearanceSettings />}
            {/* Aggiungerai qui le altre sezioni */}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
