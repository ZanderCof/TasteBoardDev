// app/(account)/(dashboard)/dashboard/menu/[slug]/edit/page.tsx
import { notFound } from "next/navigation";
import { getFullMenu, addCategory } from "./action";
import { CategorySection } from "@/components/my_components/dashboard/menu/edit/CategorySection";
import { DishItem } from "@/components/my_components/dashboard/menu/edit/DishItem";
import { EditorHeader } from "@/components/my_components/dashboard/menu/edit/EditorHeader";
import { PlusCircle, UtensilsCrossed } from "lucide-react";

export default async function EditMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const menu = await getFullMenu(slug);
  if (!menu) notFound();

  const totalDishes = menu.categories.reduce((n, c) => n + c.dishes.length, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 font-jakarta">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-150 h-150 bg-yellow-400/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">

        {/* Header con nome + delete */}
        <EditorHeader title={menu.name} menuId={menu.id} />

        {/* Stats bar */}
        <div className="mt-8 flex items-center gap-4 text-xs font-bold text-slate-400">
          <span>
            <span className="text-slate-700 font-black text-sm">{menu.categories.length}</span>{" "}
            {menu.categories.length === 1 ? "categoria" : "categorie"}
          </span>
          <span className="text-slate-200">·</span>
          <span>
            <span className="text-slate-700 font-black text-sm">{totalDishes}</span>{" "}
            {totalDishes === 1 ? "piatto" : "piatti"}
          </span>
        </div>

        {/* Categorie */}
        <div className="mt-6 space-y-4">
          {menu.categories.length > 0 ? (
            menu.categories.map((category) => (
              <CategorySection
                key={category.id}
                id={category.id}
                name={category.name}
                menuId={menu.id}
                dishCount={category.dishes.length}
              >
                {/* Dish list */}
                <div className="space-y-2">
                  {category.dishes.map((dish) => (
                    <DishItem
                      key={dish.id}
                      id={dish.id}
                      menuId={menu.id}
                      name={dish.name}
                      price={dish.price.toString()}
                      description={dish.description ?? ""}
                    />
                  ))}
                </div>
              </CategorySection>
            ))
          ) : (
            /* Empty state — nessuna categoria */
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-dashed border-slate-200 flex items-center justify-center shadow-sm">
                <UtensilsCrossed size={24} className="text-slate-300" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-slate-800">Menu vuoto</p>
                <p className="text-sm text-slate-400 font-medium">
                  Aggiungi una categoria per iniziare a costruire il menu.
                </p>
              </div>
            </div>
          )}

          {/* Aggiungi categoria */}
          <form
            action={async () => {
              "use server";
              await addCategory(menu.id, "Nuova Categoria");
            }}
          >
            <button
              type="submit"
              className="w-full py-9 bg-white/70 backdrop-blur-md border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-black uppercase tracking-[0.2em] text-[11px] hover:border-red-400 hover:text-red-600 hover:bg-white transition-all flex flex-col items-center justify-center gap-3 group shadow-sm hover:shadow-xl hover:shadow-red-500/5"
            >
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                <PlusCircle size={22} />
              </div>
              Aggiungi categoria
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}