// app/(account)/(dashboard)/dashboard/menu/[slug]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit3, Eye, Calendar, Sparkles, } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { MenuQRCode } from "@/components/my_components/QRcode/MenuQRCode";

export default async function OwnerMenuViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Recupero dati reali dal DB
  const menu = await prisma.menu.findUnique({
    where: { id: slug },
    include: {
      restaurant: true,
      _count: { select: { categories: true } },
      categories: {
        include: { _count: { select: { dishes: true } } }
      }
    }
  });

  if (!menu) notFound();

  // Calcolo totale piatti
  const totalDishes = menu.categories.reduce((acc, cat) => acc + cat._count.dishes, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-950 p-6 md:p-12 font-jakarta">
      <div className="max-w-6xl mx-auto">
        
        {/* NAVIGATION */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/dashboard/menu" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-600 transition-all">
            <ArrowLeft size={16} /> Torna alla lista
          </Link>

          <Link href={`/dashboard/menu/${slug}/edit`}>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-[1.5rem] text-sm font-bold shadow-xl shadow-slate-200 hover:bg-red-600 transition-all active:scale-95">
              <Edit3 size={16} /> Modifica Contenuti
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLONNA SINISTRA: Info e Anteprima */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative bg-white/70 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[3rem] shadow-sm overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/5 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Sparkles size={12} fill="currentColor" /> Live on TasteBoard
                </span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">{menu.name}</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-4 flex items-center gap-2">
                  <Calendar size={14} /> Aggiornato il {format(menu.createdAt, "dd MMMM yyyy", { locale: it })}
                </p>
              </div>

              <div className="flex gap-4 mt-10">
                <div className="bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm">
                  <p className="text-2xl font-black text-slate-900 leading-none">{menu._count.categories}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Sezioni</p>
                </div>
                <div className="bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm">
                  <p className="text-2xl font-black text-slate-900 leading-none">{totalDishes}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Piatti</p>
                </div>
              </div>
            </div>

            {/* Link Pubblico */}
            <div className="bg-white border border-slate-100 p-6 rounded-[2rem] flex items-center justify-between gap-4 shadow-sm group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-600 border border-yellow-100">
                  <Eye size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Anteprima Pubblica</p>
                  <p className="text-xs text-slate-500">I tuoi clienti vedranno questo indirizzo.</p>
                </div>
              </div>
              <Link 
                href={`/m/${slug}`} 
                target="_blank" 
                className="bg-slate-50 hover:bg-slate-900 hover:text-white px-6 py-3 rounded-xl text-xs font-bold transition-all uppercase"
              >
                Apri Menu →
              </Link>
            </div>
          </div>

          {/* COLONNA DESTRA: QR Code Generator */}
          <div className="lg:col-span-1">
             <MenuQRCode menuId={menu.id} restaurantName={menu.restaurant.name} />
          </div>

        </div>
      </div>
    </div>
  );
}
