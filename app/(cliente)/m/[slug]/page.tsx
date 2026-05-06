
import { CategoryNav } from "@/components/my_components/cliente/CategoryNav";
import { PublicDishCard } from "@/components/my_components/cliente/PublicDishCard";
import { PublicHeader } from "@/components/my_components/cliente/PublicHeader";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PublicMenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const menu = await prisma.menu.findUnique({
    where: { id: slug, isPublished: true },
    include: {
      restaurant: true,
      categories: {
        orderBy: { order: "asc" },
        include: { dishes: { orderBy: { id: "asc" } } }
      }
    }
  });

  if (!menu) notFound();

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      <PublicHeader restaurantName={menu.restaurant.name} logo={menu.restaurant.logo || undefined} />
      <CategoryNav categories={menu.categories} />

      <main className="p-6 space-y-12">
        {menu.categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-red-600 rounded-full" />
              <span className="uppercase tracking-tighter italic">{category.name}</span>
            </h2>
            
            <div className="space-y-4">
              {category.dishes.map((dish) => (
                <PublicDishCard 
                  key={dish.id}
                  name={dish.name}
                  price={dish.price.toString()}
                  description={dish.description || ""}
                  image={dish.image || undefined}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer Branding */}
      <footer className="py-10 flex flex-col items-center justify-center grayscale opacity-40">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1">Powered by</p>
        <p className="text-lg font-black tracking-tighter italic">TasteBoard</p>
      </footer>
    </div>
  );
}
