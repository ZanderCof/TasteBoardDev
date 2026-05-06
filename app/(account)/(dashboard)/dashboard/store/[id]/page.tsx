import StoreEditPage from "@/components/my_components/dashboard/store/editStore/StoreEditPage";
import { getStoreById } from "./action";
import { notFound } from "next/navigation";

// Nota l'aggiunta di Promise per i params
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Devi attendere i params prima di usarli
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Controllo di sicurezza
  if (!id) notFound();

  // 3. Ora passi l'id corretto a Prisma
  const storeData = await getStoreById(id);

  if (!storeData) {
    notFound();
  }

  return <StoreEditPage initialData={storeData} />;
}
