"use client";
import React from "react";
import Sidebar from "@/components/my_components/dashboard/Sidebar";
import Topbar from "@/components/my_components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // h-screen blocca l'altezza alla finestra del browser, niente doppio scroll
    <div className="flex h-screen overflow-hidden bg-[#F1F5F9] p-4 lg:p-6 font-jakarta">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        {/* Questa è l'UNICA area che deve scorrere */}
        <main className="flex-1 overflow-y-auto mt-6 pr-2 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
