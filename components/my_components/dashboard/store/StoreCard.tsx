"use client";
import { Store, MapPin, ExternalLink, Settings2 } from 'lucide-react';
import Link from 'next/link';

export const StoreCard = ({ store }: { store: any }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full">
      <div>
        {/* Immagine Logo / Placeholder */}
        <div className="w-full h-40 bg-slate-50 rounded-[2rem] mb-6 overflow-hidden relative border border-slate-100">
          <img 
            src={store.logo || "https://picsum.photos"} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt={store.name}
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-green-600 shadow-sm">
            LIVE
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-2 truncate">{store.name}</h3>
        
        <div className="space-y-3 mb-8">
          <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" />
            {store.address || "Indirizzo non specificato"}
          </p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <ExternalLink size={12} />
            tasteboard.io/{store.name.toLowerCase().replace(/\s+/g, '-')}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link 
          href={`/dashboard/store/${store.id}`}
          className="flex-1 bg-slate-900 hover:bg-red-600 text-white py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Settings2 size={16} />
          Gestisci
        </Link>
      </div>
    </div>
  );
};
