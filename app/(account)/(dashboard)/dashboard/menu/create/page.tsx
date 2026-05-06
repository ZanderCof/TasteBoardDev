"use client";
import { CategorySidebar } from "@/components/my_components/dashboard/menu/create/category-sidebar";
import { DishBuilderArea } from "@/components/my_components/dashboard/menu/create/dish-builder-area";
import { MenuBuilderHeader } from "@/components/my_components/dashboard/menu/create/menu-builder-header";

export default function CreateMenuPage() {

  return (
    <div className="space-y-10 max-w-375 mx-auto pb-20">
      <MenuBuilderHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4">
          <CategorySidebar />
        </div>

        <div className="lg:col-span-8">
          <DishBuilderArea />
        </div>
      </div>
    </div>
  );
}
