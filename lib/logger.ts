import { syncAppLogToHub } from "@/lib/hub-sync";

// Logger applicativo server-side: stampa in console (comportamento attuale)
// e inoltra all'hub StartingLine per la visibilità nel pannello admin centrale.
// Non usare lato client: il secret condiviso non deve mai arrivare al browser.

function serializeError(error: unknown) {
  if (error instanceof Error) return { message: error.message, stack: error.stack };
  return { value: error };
}

export async function logError(
  source: string,
  message: string,
  error?: unknown,
  metadata?: Record<string, unknown>,
) {
  console.error(`[${source}] ${message}`, error ?? "");
  await syncAppLogToHub({
    level: "ERROR",
    source,
    message,
    metadata: error !== undefined ? { ...metadata, error: serializeError(error) } : metadata,
  });
}

export async function logWarning(source: string, message: string, metadata?: Record<string, unknown>) {
  console.warn(`[${source}] ${message}`, metadata ?? "");
  await syncAppLogToHub({ level: "WARNING", source, message, metadata });
}

export async function logInfo(source: string, message: string, metadata?: Record<string, unknown>) {
  console.log(`[${source}] ${message}`, metadata ?? "");
  await syncAppLogToHub({ level: "INFO", source, message, metadata });
}
