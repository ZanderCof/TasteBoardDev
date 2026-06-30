import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tasteboard",
    short_name: "Tasteboard",
    description:
      "Gestionale per ristoranti e bar: menu QR, prenotazioni, dipendenti e analisi vendite in un'unica app.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#dc2626",
    lang: "it",
    categories: ["business", "food", "productivity"],
    icons: [
      {
        src: "/api/pwa-icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
