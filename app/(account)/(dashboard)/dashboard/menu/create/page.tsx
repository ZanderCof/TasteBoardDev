"use client";
import { CategorySidebar } from "@/components/my_components/dashboard/menu/create/category-sidebar";
import { DishBuilderArea } from "@/components/my_components/dashboard/menu/create/dish-builder-area";
import { MenuBuilderHeader } from "@/components/my_components/dashboard/menu/create/menu-builder-header";
import { useState } from "react";

const categories = ['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande'];

export default function CreateMenuPage() {
  const [activeTab, setActiveTab] = useState('Antipasti');

  return (
    <div className="space-y-10 max-w-[1500px] mx-auto pb-20">
      <MenuBuilderHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4">
          <CategorySidebar 
            categories={categories} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>

        <div className="lg:col-span-8">
          <DishBuilderArea activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
