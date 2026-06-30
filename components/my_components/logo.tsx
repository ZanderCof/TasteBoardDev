import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Mark (icon only) ────────────────────────────────────────────────────────

function TasteBoardMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#dc2626" />
      {/* Tine sinistra */}
      <rect x="9" y="8" width="3.5" height="12" rx="1.75" fill="white" />
      {/* Tine centrale */}
      <rect x="18.25" y="8" width="3.5" height="12" rx="1.75" fill="white" />
      {/* Tine destra */}
      <rect x="27.5" y="8" width="3.5" height="12" rx="1.75" fill="white" />
      {/* Crossbar (il "board") */}
      <rect x="9" y="18" width="22" height="3.5" rx="1.75" fill="white" />
      {/* Manico */}
      <rect x="18.25" y="18" width="3.5" height="14" rx="1.75" fill="white" />
    </svg>
  );
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

const sizeMap = {
  xs: { mark: "w-6 h-6",  text: "text-base"  },
  sm: { mark: "w-8 h-8",  text: "text-lg"    },
  md: { mark: "w-9 h-9",  text: "text-xl"    },
  lg: { mark: "w-11 h-11", text: "text-2xl"  },
  xl: { mark: "w-14 h-14", text: "text-3xl"  },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

interface TasteBoardLogoProps {
  variant?: "full" | "mark";
  size?: keyof typeof sizeMap;
  href?: string | null;
  className?: string;
  /** Usa testo bianco per sfondi scuri */
  light?: boolean;
}

export function TasteBoardLogo({
  variant = "full",
  size = "md",
  href = "/",
  className,
  light = false,
}: TasteBoardLogoProps) {
  const { mark, text } = sizeMap[size];

  const inner = (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <TasteBoardMark className={mark} />
      {variant === "full" && (
        <span className={cn("font-black tracking-tight leading-none", text)}>
          <span className={light ? "text-white" : "text-slate-900"}>taste</span>
          <span className="text-red-500">board</span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="inline-flex">
      {inner}
    </Link>
  );
}
