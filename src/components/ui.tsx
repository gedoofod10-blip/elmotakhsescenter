import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------- Icons (inline SVG) ---------------- */
export type IconName =
  | "phone"
  | "whatsapp"
  | "star"
  | "clock"
  | "pin"
  | "snow"
  | "washer"
  | "fridge"
  | "stove"
  | "heater"
  | "tv"
  | "shield"
  | "check"
  | "arrow"
  | "menu"
  | "close"
  | "plus"
  | "bolt"
  | "map"
  | "wrench"
  | "alert"
  | "external";

const stroke: Partial<Record<IconName, ReactNode>> = {
  phone: (
    <path d="M5 4h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L20 15.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M4.2 7l15.6 10M4.2 17 19.8 7" />
      <path d="m9.5 3.8 2.5 2 2.5-2M9.5 20.2l2.5-2 2.5 2" />
    </>
  ),
  washer: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <circle cx="12" cy="13.5" r="4.5" />
      <path d="M7.5 6h.01M10.5 6h.01M15 6h2" />
    </>
  ),
  fridge: (
    <>
      <rect x="5.5" y="2.5" width="13" height="19" rx="2.5" />
      <path d="M5.5 10h13M9 6v1.5M9 13v3" />
    </>
  ),
  stove: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="8.5" cy="8" r="1.8" />
      <circle cx="15.5" cy="8" r="1.8" />
      <rect x="6.5" y="12.5" width="11" height="6" rx="1" />
    </>
  ),
  heater: (
    <>
      <rect x="6" y="2.5" width="12" height="17" rx="3" />
      <path d="M10 22h4M12 8c-1.6 1.8-2.2 3-2.2 4.2a2.2 2.2 0 0 0 4.4 0C14.2 11 13.6 9.8 12 8Z" />
    </>
  ),
  tv: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.8 3.2 8.4 7.5 10 4.3-1.6 7.5-5.2 7.5-10v-6L12 2.5Z" />
      <path d="m8.8 12 2.4 2.4 4.2-4.6" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  arrow: <path d="M20 12H4m6-6-6 6 6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  plus: <path d="M12 5v14M5 12h14" />,
  bolt: <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />,
  map: (
    <>
      <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  wrench: (
    <path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8a2.1 2.1 0 0 1-3-3l8-8-1.5-1.5Zm-2.8 3.2L5 3 3 5l6.7 6.7" />
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
};

export function Icon({
  name,
  className = "w-5 h-5",
}: {
  name: IconName;
  className?: string;
}) {
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.93 9.93 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12a17 17 0 0 1-1.72-.64c-3.03-1.31-5-4.37-5.15-4.57-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.6-.38.8-.38h.58c.19 0 .43-.07.67.5.25.6.84 2.07.92 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.09 1.32 2.39 1.47.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.76.83 2.06.98.3.15.5.22.57.35.08.12.08.72-.17 1.42Z" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
        <path d="m12 2.8 2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93L12 2.8Z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {stroke[name]}
    </svg>
  );
}

/* ---------------- Logo (الشعار الأصلي — بدون إعادة رسم) ---------------- */
export function Logo({ className = "" }: { className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ aspectRatio: "2.15 / 1" }}
    >
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="شعار مركز المتخصص للصيانة"
        width={300}
        height={140}
        className="h-full w-full object-cover"
        style={{ objectPosition: "50% 52%" }}
        onError={() => setOk(false)}
      />
    </span>
  );
}

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHead({
  eyebrow,
  title,
  text,
  dark = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <span className={`eyebrow ${dark ? "on-dark" : ""}`}>{eyebrow}</span>
      <h2 className={`t-section mt-3 ${dark ? "text-white" : ""}`}>{title}</h2>
      {text && (
        <p className={`t-lead measure mt-4 ${dark ? "text-white/70" : "text-ink/70"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------- Open / closed status (Africa/Cairo) ---------------- */
export function useOpenStatus() {
  const compute = () => {
    try {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
      const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
      const mins = h * 60 + m;
      return mins >= 10 * 60 + 30 && mins < 20 * 60;
    } catch {
      return null;
    }
  };
  const [open, setOpen] = useState<boolean | null>(compute);
  useEffect(() => {
    const t = setInterval(() => setOpen(compute()), 60000);
    return () => clearInterval(t);
  }, []);
  return open;
}
