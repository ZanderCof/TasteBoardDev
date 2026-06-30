import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NUVIIO_HUB_URL ?? "https://nuviio-liard.vercel.app";
const SECRET = process.env.INTERNAL_API_SECRET ?? "";

async function isInMaintenance(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${BASE_URL}/api/external/tasteboard/status`, {
      headers: { "x-internal-secret": SECRET },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(id);
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.maintenance);
  } catch {
    return false; // fail silenzioso — non bloccare l'app
  }
}

export default NextAuth(authConfig).auth(async (req) => {
  const { pathname } = req.nextUrl;

  // Salta la pagina di manutenzione e le API interne
  if (pathname.startsWith("/maintenance") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const maintenance = await isInMaintenance();
  if (maintenance) {
    const url = req.nextUrl.clone();
    url.pathname = "/maintenance";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico).*)"],
};
