"use client";
import { CategoryScroller } from "@/components/my_components/dashboard/menu/view/category-scroller";
import { DishCard } from "@/components/my_components/dashboard/menu/view/dish-card";
import { MenuHeader } from "@/components/my_components/dashboard/menu/view/menu-header";
import { useState } from "react";


// Esempio dati (verranno poi dal DB tramite lo slug)
const restaurantData = {
  name: "Pizzeria da Mario",
  address: "Via Roma 12, Milano",
  logo: "/logo.png",
  coverImage: "https://unsplash.com",
  categories: ["Antipasti", "Pizze Classiche", "Pizze Speciali", "Dolci", "Bevande"]
};

export default function PublicMenuPage() {
  const [activeCategory, setActiveCategory] = useState("Antipasti");

  return (
    <div className="min-h-screen bg-slate-50 font-jakarta pb-10">
      <MenuHeader restaurant={restaurantData} />
      
      <CategoryScroller 
        categories={restaurantData.categories} 
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="container mx-auto px-4 mt-6 space-y-8">
        {/* Questa sezione si ripeterà per ogni categoria */}
        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 pl-2">
            {activeCategory}
          </h2>
          <div className="grid gap-4">
             {/* Simulazione piatti */}
             {[1,2,3,4].map((i) => (
               <DishCard key={i} dish={{
                 name: "Margherita Tradizionale",
                 price: 7.5,
                 description: "Pomodoro San Marzano, Mozzarella di Bufala, Basilico Fresco, Olio EVO.",
                 allergens: ["Glutine", "Lattosio"],
                 image: "https://unsplash.com"
               }} />
             ))}
          </div>
        </section>
      </div>

      {/* Footer minimalista */}
      <footer className="mt-12 text-center py-6">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center justify-center gap-2">
           Menu Digitale Powered by <span className="text-red-600">Tasteboard</span>
         </p>
      </footer>
    </div>
  );
}
