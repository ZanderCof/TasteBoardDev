"use client";
import { Info, MapPin } from "lucide-react";
import Image from 'next/image';

interface Restaurant {
  coverImage: string;
  name: string;
  address: string;
  logo: string;
}

export function MenuHeader({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      {/* Immagine di Copertina */}
      <div className="absolute inset-0 bg-slate-900">
        <img 
          src={restaurant.coverImage} 
          className="w-full h-full object-cover opacity-60" 
          alt={restaurant.name} 
        />
      </div>
      
      {/* Info sovrapposte */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-slate-950 via-transparent text-white">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <MapPin size={12} strokeWidth={3} />
              <span>{restaurant.address}</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-2xl border-2 border-white/20">
            <img src={restaurant.logo} className="w-full h-full object-contain rounded-xl" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
