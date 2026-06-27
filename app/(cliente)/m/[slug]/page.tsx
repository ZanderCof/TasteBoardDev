// app/menu/[slug]/page.tsx  (o il path della tua route pubblica)
import { CategoryNav } from "@/components/my_components/cliente/CategoryNav";
import { PublicDishCard } from "@/components/my_components/cliente/PublicDishCard";
import { PublicHeader } from "@/components/my_components/cliente/PublicHeader";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const menu = await prisma.menu.findUnique({
    where: { id: slug, isPublished: true },
    include: {
      restaurant: true,
      categories: {
        orderBy: { order: "asc" },
        include: {
          dishes: {
            orderBy: { name: "asc" },
            // `available` è ora incluso automaticamente da Prisma
          },
        },
      },
    },
  });

  if (!menu) notFound();

  const totalDishes = menu.categories.reduce((n, c) => n + c.dishes.length, 0);
  const unavailableCount = menu.categories.reduce(
    (n, c) => n + c.dishes.filter((d) => !d.available).length,
    0
  );

  return (
    <div className="bg-[#F8F7F5] min-h-screen">
      <PublicHeader
        restaurantName={menu.restaurant.name}
        logo={menu.restaurant.logo ?? undefined}
        totalDishes={totalDishes}
        categoriesCount={menu.categories.length}
      />

      {/* Sticky category nav */}
      <CategoryNav categories={menu.categories.map((c) => ({ id: c.id, name: c.name }))} />

      {/* Avviso piatti terminati — solo se ce ne sono */}
      {unavailableCount > 0 && (
        <div className="max-w-2xl mx-auto px-4 pt-4">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-2.5 text-xs font-bold text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            {unavailableCount}{" "}
            {unavailableCount === 1 ? "piatto temporaneamente esaurito" : "piatti temporaneamente esauriti"}
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 pt-6 pb-24 space-y-14">
        {menu.categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-36">
            {/* Intestazione categoria */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-5 bg-red-600 rounded-full shrink-0" />
              <h2 className="text-base font-black text-slate-900 uppercase tracking-[0.12em]">
                {category.name}
              </h2>
              <div className="flex-1 h-px bg-slate-200/60" />
              <span className="text-[10px] font-bold text-slate-400 shrink-0">
                {category.dishes.length} piatti
              </span>
            </div>

            <div className="space-y-3">
              {category.dishes.map((dish) => (
                <PublicDishCard
                  key={dish.id}
                  name={dish.name}
                  price={Number(dish.price)}
                  description={dish.description ?? ""}
                  image={dish.image ?? undefined}
                  available={dish.available}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer branding */}
      <footer className="py-10 flex flex-col items-center gap-1 opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Powered by</p>
        <p className="text-sm font-black tracking-tighter italic text-slate-800">TasteBoard</p>
      </footer>
    </div>
  );
}