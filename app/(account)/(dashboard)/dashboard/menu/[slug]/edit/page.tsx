import { CategorySection } from "@/components/my_components/dashboard/menu/edit/CategorySection";
import { DishItem } from "@/components/my_components/dashboard/menu/edit/DishItem";
import { EditorHeader } from "@/components/my_components/dashboard/menu/edit/EditorHeader";
import { notFound } from "next/navigation";
import { getFullMenu } from "./action";

interface EditMenuPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
  // Risolve i params in modo sicuro sia per le vecchie che per le nuove versioni di Next.js
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    notFound();
  }

  const menu = await getFullMenu(resolvedParams.slug);

  if (!menu) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header con ID e Titolo reale */}
        <EditorHeader title={menu.name} menuId={menu.id} />

        <div className="space-y-8 mt-10">
          {menu.categories.map((category) => (
            <CategorySection key={category.id} name={category.name}>
              {category.dishes.length > 0 ? (
                category.dishes.map((dish) => (
                  <DishItem 
                    key={dish.id}
                    name={dish.name}
                    price={dish.price.toString()}
                    description={dish.description || ""}
                  />
                ))
              ) : (
                <p className="text-sm text-slate-400 italic p-4 text-center">
                  Nessun piatto in questa categoria.
                </p>
              )}
            </CategorySection>
          ))}
        </div>
      </div>
    </div>
  );
}
