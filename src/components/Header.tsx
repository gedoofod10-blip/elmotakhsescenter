import { useEffect, useState } from "react";
import { BRAND, NAV, waLink } from "../data";
import { Icon, Logo } from "./ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // lock scroll + Esc when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="tri h-[3px]" />
        <div className="wrap flex items-center justify-between gap-3" style={{ height: "var(--header-h)" }}>
          <a href="#top" className="flex min-w-0 items-center gap-2.5 no-underline text-ink" aria-label={`${BRAND.name} — الرئيسية`}>
            <Logo className="h-[46px] sm:h-[52px]" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.85rem] font-black leading-[1.25] sm:text-[1.1rem]">مركز المتخصص للصيانة</span>
              <span className="text-[0.7rem] font-semibold text-brand-red sm:text-xs">
                {BRAND.slogan}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="التنقل الرئيسي">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={`nav-link ${active === n.href ? "is-active" : ""}`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={BRAND.tel}
              className="btn btn-outline btn-sm hidden lg:inline-flex"
              aria-label={`اتصل بنا ${BRAND.phone}`}
            >
              <Icon name="phone" className="h-4 w-4" />
              <span dir="ltr">{BRAND.phone}</span>
            </a>
            <a href="#booking" className="btn btn-red btn-sm hidden sm:inline-flex">
              احجز الآن
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-xl border-2 border-line bg-white transition-colors hover:border-ink xl:hidden"
              aria-label="فتح القائمة"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div id="mobile-menu" className={`menu-sheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="backdrop" onClick={() => setOpen(false)} />
        <div className="panel" role="dialog" aria-modal="true" aria-label="القائمة">
          <div className="flex items-center justify-between pb-3">
            <span className="text-lg font-black">القائمة</span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 transition-colors hover:bg-white/10"
              aria-label="إغلاق القائمة"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <Icon name="close" className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col" aria-label="قائمة الجوال">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="menu-link"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {n.label}
                <Icon name="arrow" className="h-5 w-5 opacity-50" />
              </a>
            ))}
          </nav>
          <div className="mt-auto grid gap-3 pt-8">
            <p className="t-small text-white/60">{BRAND.hours}</p>
            <a
              href="#booking"
              className="btn btn-red"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              احجز طلب صيانة
            </a>
            <a href={waLink("السلام عليكم، أرغب في الاستفسار عن خدمات الصيانة.")} target="_blank" rel="noopener noreferrer" className="btn btn-wa" tabIndex={open ? 0 : -1}>
              <Icon name="whatsapp" className="h-5 w-5" /> واتساب
            </a>
            <a href={BRAND.tel} className="btn btn-outline-light" tabIndex={open ? 0 : -1}>
              <Icon name="phone" className="h-5 w-5" />
              <span dir="ltr">{BRAND.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
