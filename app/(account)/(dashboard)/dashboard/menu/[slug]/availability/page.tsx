// app/(account)/(dashboard)/dashboard/menu/[slug]/availability/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, UtensilsCrossed } from "lucide-react";
import { DishAvailabilityToggle } from "@/components/my_components/dashboard/menu/availability/DishAvailabilityToggle";
import { ResetAvailabilityButton } from "@/components/my_components/dashboard/menu/availability/ResetAvailabilityButton";

export default async function AvailabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const menu = await prisma.menu.findUnique({
    where: { id: slug },
    include: {
      categories: {
        orderBy: { order: "asc" },
        include: {
          dishes: {
            orderBy: { name: "asc" },
          },
        },
      },
    },
  });

  if (!menu) notFound();

  // Statistiche rapide
  const allDishes = menu.categories.flatMap((c) => c.dishes);
  const availableCount = allDishes.filter((d) => d.available).length;
  const unavailableCount = allDishes.length - availableCount;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 font-jakarta">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-emerald-500/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-red-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/menu/${slug}/edit`}
              className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-700 hover:border-slate-200 transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-500 mb-0.5">
                Disponibilità
              </p>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900">
                {menu.name}
              </h1>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <ResetAvailabilityButton menuId={menu.id} />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-emerald-100 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none">{availableCount}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Disponibili</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-red-100 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <XCircle size={18} className="text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none">{unavailableCount}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Esauriti</p>
            </div>
          </div>
        </div>

        {/* ── Avviso esauriti in cima ── */}
        {unavailableCount > 0 && (
          <div className="mt-4 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            <XCircle size={16} className="text-amber-500 shrink-0" />
            <p className="text-xs font-bold text-amber-700">
              {unavailableCount} {unavailableCount === 1 ? "piatto segnato" : "piatti segnati"} come esauriti.
              {" "}Clicca su un piatto per aggiornare la disponibilità.
            </p>
          </div>
        )}

        {/* ── Categorie e piatti ── */}
        <div className="mt-8 space-y-8">
          {menu.categories.map((category) => (
            <section key={category.id}>
              {/* Intestazione categoria */}
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {category.name}
                </h2>
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[10px] font-bold text-slate-300">
                  {category.dishes.filter((d) => d.available).length}/{category.dishes.length}
                </span>
              </div>

              {/* Lista piatti */}
              {category.dishes.length > 0 ? (
                <div className="space-y-2">
                  {category.dishes.map((dish) => (
                    <DishAvailabilityToggle
                      key={dish.id}
                      dishId={dish.id}
                      name={dish.name}
                      price={Number(dish.price)}
                      available={dish.available}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-dashed border-slate-100 text-slate-300">
                  <UtensilsCrossed size={16} />
                  <span className="text-xs font-bold">Nessun piatto in questa categoria</span>
                </div>
              )}
            </section>
          ))}

          {allDishes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-dashed border-slate-200 flex items-center justify-center">
                <UtensilsCrossed size={24} className="text-slate-300" />
              </div>
              <div>
                <p className="font-black text-slate-700">Nessun piatto nel menu</p>
                <p className="text-sm text-slate-400 font-medium mt-0.5">
                  Aggiungi i piatti dall&apos;editor del menu.
                </p>
              </div>
              <Link
                href={`/dashboard/menu/${slug}/edit`}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-600 transition-all"
              >
                Vai all&apos;editor
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}