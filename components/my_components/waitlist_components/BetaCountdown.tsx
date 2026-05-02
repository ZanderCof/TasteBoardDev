"use client";

import { useState, useEffect } from "react";

// 1. Sposta 'Slot' fuori da BetaCountdown
const Slot = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">
      {label}
    </span>
  </div>
);

export const BetaCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date("2026-12-31T00:00:00"); // Imposta la tua data
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-6 md:gap-12 justify-center py-8">
      <Slot value={timeLeft.days} label="Giorni" />
      <Slot value={timeLeft.hours} label="Ore" />
      <Slot value={timeLeft.minutes} label="Minuti" />
      <Slot value={timeLeft.seconds} label="Secondi" />
    </div>
  );
};
