import { useEffect, useRef, useState } from "react";
import { BRAND, MAPS_EMBED, MAPS_LINK, waLink } from "../data";
import { Icon, Reveal, SectionHead } from "./ui";

/* ================= آراء العملاء ================= */
function Gauge({ value, max }: { value: number; max: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const r = 88;
  const c = 2 * Math.PI * r;
  const offset = on ? c * (1 - value / max) : c;
  return (
    <svg ref={ref} viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
      <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" />
      <circle
        cx="100"
        cy="100"
        r={r}
        fill="none"
        stroke="#D60000"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="ring-draw"
      />
    </svg>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="section bg-white">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-[28px] bg-ink p-8 text-center text-white sm:p-10">
              <div className="tri absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
              <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56">
                <Gauge value={BRAND.rating} max={5} />
                <div className="absolute inset-0 grid place-items-center">
                  <div>
                    <p className="text-6xl font-black leading-none sm:text-7xl">4.6</p>
                    <p className="mt-1 text-sm font-bold text-white/55">من 5</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-1 text-[#f5a300]" aria-label="تقييم 4.6 من 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" className={`h-6 w-6 ${i === 4 ? "opacity-40" : ""}`} />
                ))}
              </div>
              <p className="mt-3 font-bold">التقييم المقدَّم للمركز</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <SectionHead
            eyebrow="آراء العملاء"
            title={
              <>
                ثقتكم هي <span className="text-brand-red">أهم تقييم</span> لنا
              </>
            }
            text="تقييم المركز 4.6 من 5. نعرض هنا التقييم العام فقط، ونفضّل أن تقرأ آراء العملاء الحقيقية بنفسك على خرائط جوجل بدلاً من اقتباسات لا يمكن توثيقها."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Reveal delay={60}>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full items-start gap-4 p-5 no-underline text-ink"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-red text-white">
                  <Icon name="map" className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-extrabold">اقرأ الآراء على خرائط جوجل</span>
                  <span className="t-small mt-1 flex items-center gap-1.5 text-ink/60">
                    افتح صفحة المركز
                    <Icon name="external" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={150}>
              <a
                href={waLink("السلام عليكم، أود مشاركة رأيي في تجربتي مع مركز المتخصص للصيانة.")}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full items-start gap-4 p-5 no-underline text-ink"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-green text-white">
                  <Icon name="whatsapp" className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-extrabold">شاركنا رأيك</span>
                  <span className="t-small mt-1 flex items-center gap-1.5 text-ink/60">
                    أرسل ملاحظاتك على واتساب
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= مناطق التغطية ================= */
export function Coverage() {
  const tiers = [
    { n: "01", t: "شبرا الخيمة", d: "مقر المركز وقلب نطاق الخدمة.", c: "bg-brand-red" },
    { n: "02", t: "القليوبية", d: "نغطي مناطق محافظة القليوبية.", c: "bg-ink" },
    { n: "03", t: "القاهرة الكبرى", d: "ويمتد نطاقنا إلى القاهرة الكبرى.", c: "bg-brand-green" },
  ];
  return (
    <section id="coverage" className="section relative overflow-hidden bg-paper">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <SectionHead
            eyebrow="مناطق التغطية"
            title={
              <>
                نصل إليك في <span className="text-brand-green">شبرا الخيمة</span> وما حولها
              </>
            }
            text="نطاق خدمتنا: شبرا الخيمة والقليوبية والقاهرة الكبرى. غير متأكد أن منطقتك ضمن النطاق؟ اسألنا قبل الحجز."
          />
          <ol className="mt-8 grid gap-3">
            {tiers.map((t, i) => (
              <Reveal key={t.n} delay={i * 90}>
                <li className="card flex items-center gap-4 p-4 sm:p-5">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-black text-white ${t.c}`}>
                    {t.n}
                  </span>
                  <div>
                    <h3 className="text-[1.1rem] font-extrabold leading-snug">{t.t}</h3>
                    <p className="t-small text-ink/65">{t.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-7">
            <a
              href={waLink("السلام عليكم، أود التأكد هل منطقتي ضمن نطاق خدمتكم؟ المنطقة: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              اسأل عن منطقتك
            </a>
          </Reveal>
        </div>

        <Reveal className="order-1 lg:order-2 lg:col-span-6">
          <figure className="mx-auto w-full max-w-[26rem] lg:max-w-[30rem]">
            <svg viewBox="0 0 400 400" className="h-auto w-full" role="img" aria-label="رسم توضيحي لنطاق الخدمة: شبرا الخيمة ثم القليوبية ثم القاهرة الكبرى">
              <circle cx="200" cy="200" r="192" fill="#278C36" fillOpacity="0.08" stroke="#278C36" strokeWidth="2" strokeDasharray="6 8" className="spin-slow" style={{ transformOrigin: "200px 200px" }} />
              <circle cx="200" cy="200" r="132" fill="#000C00" fillOpacity="0.07" stroke="#000C00" strokeOpacity="0.5" strokeWidth="2" />
              <circle cx="200" cy="200" r="72" fill="#D60000" />
              <circle cx="200" cy="200" r="72" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 7" />
              {/* pin */}
              <path d="M200 160c-12 0-21 9-21 21 0 16 21 33 21 33s21-17 21-33c0-12-9-21-21-21Z" fill="#fff" transform="translate(0,-14)" />
              <circle cx="200" cy="167" r="7" fill="#D60000" />
              <text x="200" y="224" textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight="800" fontSize="19" fill="#fff">شبرا الخيمة</text>
              <text x="200" y="102" textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight="800" fontSize="20" fill="#000C00">القليوبية</text>
              <text x="200" y="40" textAnchor="middle" fontFamily="Cairo, sans-serif" fontWeight="800" fontSize="20" fill="#1d6e29">القاهرة الكبرى</text>
            </svg>
            <figcaption className="t-small mt-3 text-center text-ink/50">رسم توضيحي لنطاق الخدمة وليس خريطة جغرافية</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= العنوان وخريطة الوصول ================= */
export function Location() {
  return (
    <section id="location" className="section bg-white">
      <div className="wrap">
        <SectionHead
          eyebrow="العنوان وخريطة الوصول"
          title={
            <>
              زورونا في <span className="text-brand-red">شبرا الخيمة</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-[24px] bg-ink p-6 text-white sm:p-8">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-red">
                    <Icon name="pin" className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="t-small text-white/55">العنوان</p>
                    <address className="text-[0.975rem] font-bold not-italic leading-relaxed">{BRAND.address}</address>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10">
                    <Icon name="clock" className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="t-small text-white/55">مواعيد العمل</p>
                    <p className="font-bold">{BRAND.hours}</p>
                    <p className="t-small mt-1 text-white/65">{BRAND.emergency}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 grid gap-3 lg:mt-auto lg:pt-8">
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                  <Icon name="map" className="h-5 w-5" />
                  افتح في خرائط جوجل
                </a>
                <a href={BRAND.tel} className="btn btn-outline-light">
                  <Icon name="phone" className="h-5 w-5" />
                  <span dir="ltr">{BRAND.phone}</span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={100}>
            <div className="chamfer-sm h-[22rem] overflow-hidden bg-paper ring-1 ring-line sm:h-[26rem] lg:h-full lg:min-h-[28rem]">
              <iframe
                title="خريطة موقع مركز المتخصص للصيانة"
                src={MAPS_EMBED}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
