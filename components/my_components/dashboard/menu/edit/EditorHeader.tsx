"use client";
import { updateMenuName, deleteMenu } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
// ... altri import

export function EditorHeader({ title, menuId }: { title: string, menuId: string }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const router = useRouter();

  const handleSave = async () => {
    await updateMenuName(menuId, currentTitle);
    alert("Menu aggiornato con successo!");
  };

  const handleDelete = async () => {
    if (confirm("Sei sicuro di voler eliminare questo menu?")) {
      await deleteMenu(menuId);
      router.push("/dashboard/menu");
    }
  };

  return (
    <div className="flex items-center justify-between">
       <input 
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          className="bg-transparent text-3xl font-black focus:outline-none focus:border-b-2 border-yellow-400"
       />
       <div className="flex gap-2">
          <button onClick={handleDelete} className="...">Elimina</button>
          <button onClick={handleSave} className="...">Salva</button>
       </div>
    </div>
  );
}
