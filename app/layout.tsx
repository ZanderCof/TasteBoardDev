import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/my_components/providers";
import { ServiceWorkerRegistration } from "@/components/my_components/service-worker-registration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta", // Crea una variabile CSS
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nuviio | TasteBoard - Gestionale per ristoranti e bar",
    template: "%s | Nuviio",
  },
  description:
    "Gestionale per ristoranti e bar: menu QR, prenotazioni, dipendenti e analisi vendite in un'unica app installabile.",
  appleWebApp: {
    capable: true,
    title: "Nuviio",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#dc2626",
};

// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${jakarta.variable} ${geistMono.variable} antialiased`}
    >
      <body className="font-sans min-h-screen flex flex-col">
        <main className="">
          <Providers>{children}</Providers>
        </main>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
