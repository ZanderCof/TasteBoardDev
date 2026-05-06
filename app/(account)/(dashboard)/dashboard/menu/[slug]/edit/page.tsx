import { notFound } from "next/navigation";
import { getFullMenu, addCategory } from "./action";
import { CategorySection } from "@/components/my_components/dashboard/menu/edit/CategorySection";
import { DishItem } from "@/components/my_components/dashboard/menu/edit/DishItem";
import { EditorHeader } from "@/components/my_components/dashboard/menu/edit/EditorHeader";
import { PlusCircle, } from "lucide-react";

export default async function EditMenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getFullMenu(slug);

  if (!menu) notFound();

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 font-jakarta">
      {/* Glow ambientali più intensi per il look moderno */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-150 h-150 bg-yellow-400/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12">
        <EditorHeader title={menu.name} menuId={menu.id} />

        <div className="mt-16 space-y-10">
          {menu.categories.map((category) => (
            <CategorySection 
              key={category.id} 
              id={category.id}
              name={category.name} 
              menuId={menu.id}
            >
              <div className="grid gap-3">
                {category.dishes.length > 0 ? (
                  category.dishes.map((dish) => (
                    <DishItem 
                      key={dish.id}
                      id={dish.id}
                      menuId={menu.id}
                      name={dish.name}
                      price={dish.price.toString()}
                      description={dish.description || ""}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 bg-white/40 backdrop-blur-sm border-2 border-dashed border-slate-100 rounded-[2rem]">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Nessun piatto inserito</p>
                  </div>
                )}
              </div>
            </CategorySection>
          ))}

          {/* Bottone Aggiungi Categoria - Design Premium */}
          <form action={async () => {
            "use server";
            await addCategory(menu.id, "Nuova Categoria");
          }}>
            <button className="w-full py-10 bg-white/60 backdrop-blur-md border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 font-black uppercase tracking-[0.2em] text-[11px] hover:border-red-400 hover:text-red-600 hover:bg-white transition-all flex flex-col items-center justify-center gap-3 group shadow-sm hover:shadow-xl hover:shadow-red-500/5">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                <PlusCircle size={24} />
              </div>
              Aggiungi Categoria
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}
