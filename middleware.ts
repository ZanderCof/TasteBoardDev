// middleware.ts (nella root di TasteBoard)
import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const hasBusiness = req.auth?.user?.hasBusiness;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isOnboardingPage = req.nextUrl.pathname.startsWith("/onboarding");

  // 1. Se non è loggato e non è sulla pagina di login, portalo al login
  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  // 2. Se è loggato ma NON ha un locale e NON è già in onboarding, forzalo lì
  if (isLoggedIn && !hasBusiness && !isOnboardingPage) {
    return Response.redirect(new URL("/onboarding", req.nextUrl));
  }

  // 3. Se ha già un locale e prova a tornare in onboarding, rimandalo in dashboard
  if (isLoggedIn && hasBusiness && isOnboardingPage) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
