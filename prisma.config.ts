// prisma.config.ts
import "dotenv/config"; // Carica il file .env prima di tutto
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // 1. Specifica la rotta dello schema (obbligatoria per i tipi di Prisma 7)
  schema: "prisma/schema.prisma",
  
  // 2. Configura il database usando l'helper nativo 'env' che gestisce i tipi in automatico
  datasource: {
    url: env("DATABASE_URL"),
  },
});