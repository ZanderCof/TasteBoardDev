// components/my_components/features/bento-features.tsx
import { QrCode, Users, Utensils, BarChart, Smartphone, Globe } from "lucide-react";

export function BentoFeatures() {
  const items = [
    { 
      title: "Menu QR istantaneo", 
      icon: <QrCode />, 
      size: "col-span-1", 
      desc: "Accesso al menu in un secondo, senza app o download." 
    },
    { 
      title: "Multi-lingua AI", 
      icon: <Globe />, 
      size: "col-span-1", 
      desc: "Traduci automaticamente il menu per clienti stranieri." 
    },
    { 
      title: "Analytics vendite", 
      icon: <BarChart />, 
      size: "col-span-2", 
      desc: "Monitora piatti più venduti e performance del locale in tempo reale." 
    },
    { 
      title: "Mobile first", 
      icon: <Smartphone />, 
      size: "col-span-1", 
      desc: "Perfetto su qualsiasi smartphone, senza installazioni." 
    },
    { 
      title: "Gestione ricette", 
      icon: <Utensils />, 
      size: "col-span-1", 
      desc: "Tieni sotto controllo ingredienti e composizione dei piatti." 
    },
        { 
      title: "Gestione Staff", 
      icon: <Users />, 
      size: "col-span-2", 
      desc: "Organizza turni, ruoli e permessi in modo semplice e centralizzato." 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {items.map((item, i) => (
        <div
          key={i}
          className={`${item.size} p-6 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-md transition-all group`}
        >
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            {item.icon}
          </div>

          <h4 className="font-bold text-slate-900">{item.title}</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}