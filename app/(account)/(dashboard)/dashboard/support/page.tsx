import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SupportView } from "@/components/my_components/dashboard/support/support-view";
import { getMyTickets } from "./action";

type PageProps = {
  searchParams: Promise<{ restaurantId?: string }>;
};

export default async function SupportPage({ searchParams }: PageProps) {
  const { restaurantId: restaurantParam } = await searchParams;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  let currentRestaurantId = restaurantParam;
  if (!currentRestaurantId) {
    const firstRestaurant = await prisma.restaurant.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!firstRestaurant) redirect("/dashboard/restaurants/new");
    currentRestaurantId = firstRestaurant.id;
  }

  const ticketsResult = await getMyTickets();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <SupportView
        restaurantId={currentRestaurantId}
        tickets={ticketsResult.success ? ticketsResult.tickets : []}
      />
    </div>
  );
}
