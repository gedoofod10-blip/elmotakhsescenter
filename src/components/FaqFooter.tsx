import { useId, useState } from "react";
import { BRAND, FAQ, NAV, SERVICES, waLink } from "../data";
import { Icon, Logo, Reveal, SectionHead } from "./ui";

/* ================= الأسئلة الشائعة ================= */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" className="section bg-paper">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              eyebrow="الأسئلة الشائعة"
              title={
                <>
                  أجوبة <span className="text-brand-red">سريعة</span> لأسئلتك
                </>
              }
              text="إن لم تجد ما تبحث عنه، راسلنا وسنجيبك."
            />
            <Reveal className="mt-6">
              <a
                href={waLink("السلام عليكم، لدي استفسار:")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa w-full sm:w-auto"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                اسأل عبر واتساب
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid gap-3">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={Math.min(i, 4) * 50}>
                  <div
                    className={`rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${
                      isOpen ? "border-ink/40 shadow-[0_20px_40px_-30px_rgba(0,12,0,0.45)]" : "border-line hover:border-ink/25"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`${uid}-b${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`${uid}-p${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-transparent px-5 py-4 text-start font-[inherit] text-[1.0625rem] font-extrabold leading-snug text-ink sm:px-6"
                      >
                        {f.q}
                        <span className="acc-icon grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper">
                          <Icon name="plus" className="h-5 w-5" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`${uid}-p${i}`}
                      role="region"
                      aria-labelledby={`${uid}-b${i}`}
                      className="acc-panel"
                      data-open={isOpen}
                    >
                      <div>
                        <p className="px-5 pb-5 text-[0.975rem] leading-[1.9] text-ink/72 sm:px-6">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Footer ================= */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="tri h-1.5" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="wrap relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-5">
          <div className="flex items-center gap-3">
            <Logo className="h-14 rounded-xl" />
            <div className="leading-tight">
              <p className="text-xl font-black">مركز المتخصص للصيانة</p>
              <p className="text-sm font-bold text-[#ff5a5a]">{BRAND.slogan}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-white/65">
            لصيانة جميع الأجهزة المنزلية والتكييف — شبرا الخيمة والقليوبية والقاهرة الكبرى.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={BRAND.tel} className="btn btn-red btn-sm">
              <Icon name="phone" className="h-4 w-4" />
              اتصل بنا
            </a>
            <a href={BRAND.wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">
              <Icon name="whatsapp" className="h-4 w-4" />
              واتساب
            </a>
          </div>
        </div>

        <nav aria-label="روابط التذييل" className="lg:col-span-2">
          <h3 className="mb-4 text-base font-extrabold">روابط سريعة</h3>
          <ul className="grid gap-2.5 text-[0.9375rem]">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-white/65 transition-colors hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#booking" className="text-white/65 transition-colors hover:text-white">
                نموذج الحجز
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-base font-extrabold">خدماتنا</h3>
          <ul className="grid gap-2.5 text-[0.9375rem]">
            {SERVICES.map((s, i) => (
              <li key={s.id}>
                <a href="#services" className="text-white/65 transition-colors hover:text-white">
                  {
                    [
                      "التكييفات",
                      "الغسالات",
                      "الثلاجات والديب فريزر",
                      "أجهزة الطهي والميكروويف",
                      "السخانات",
                      "غسالات الأطباق والشاشات",
                    ][i]
                  }
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-base font-extrabold">تواصل معنا</h3>
          <ul className="grid gap-4 text-[0.9375rem] text-white/75">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-1 h-5 w-5 shrink-0 text-[#ff5a5a]" />
              <address className="not-italic leading-relaxed">{BRAND.address}</address>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="mt-1 h-5 w-5 shrink-0 text-[#ff5a5a]" />
              <a href={BRAND.tel} dir="ltr" className="font-bold text-white">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-1 h-5 w-5 shrink-0 text-[#ff5a5a]" />
              <span>
                {BRAND.hours}
                <br />
                <span className="text-white/55">{BRAND.emergency}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-[0.8125rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}. جميع الحقوق محفوظة.</p>
          <p>الصور المعروضة توضيحية للخدمات.</p>
        </div>
      </div>
    </footer>
  );
}

/* ================= شريط الاتصال الثابت للموبايل + زر واتساب للديسكتوب ================= */
export function ContactDock() {
  return (
    <>
      <div className="mobile-bar md:hidden" role="region" aria-label="اتصال سريع">
        <a href={BRAND.tel} className="btn btn-red" aria-label={`اتصل بنا ${BRAND.phone}`}>
          <Icon name="phone" className="h-5 w-5" />
          اتصل الآن
        </a>
        <a
          href={waLink("السلام عليكم، أرغب في الاستفسار عن خدمات الصيانة.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          واتساب
        </a>
      </div>
      <a
        href={waLink("السلام عليكم، أرغب في الاستفسار عن خدمات الصيانة.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-6 left-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-brand-green text-white shadow-[0_14px_30px_-10px_rgba(39,140,54,0.8)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 md:grid"
      >
        <Icon name="whatsapp" className="h-7 w-7" />
      </a>
    </>
  );
}
