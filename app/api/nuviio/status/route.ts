import { NextResponse } from "next/server";
import { fetchMaintenanceStatus } from "@/lib/nuviio-status";

// Proxy server-side: il secret non viene mai esposto al browser
export async function GET() {
  const status = await fetchMaintenanceStatus();
  return NextResponse.json(status);
}
