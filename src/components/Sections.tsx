import { BRAND, STEPS, WHY, img, waLink } from "../data";
import { Icon, Reveal, SectionHead, type IconName } from "./ui";

/* ================= لماذا تختار مركز المتخصص ================= */
export function Why() {
  return (
    <section id="why" className="section relative overflow-hidden bg-ink text-white">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Visual column */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:sticky lg:top-28 lg:max-w-none">
            <div className="chamfer relative aspect-[5/4] overflow-hidden lg:aspect-[4/5]">
              <img
                src={img(34734504, 900)}
                alt="فني يصلح جهازاً منزلياً"
                loading="lazy"
                decoding="async"
                width={900}
                height={1100}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-5xl font-black leading-none text-white sm:text-6xl">أمان</p>
                <p className="mt-1 text-5xl font-black leading-none text-[#ff3b3b] sm:text-6xl">ضمان</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="tri h-1 w-16 rounded-full" />
              <span className="t-small text-white/50">صورة توضيحية</span>
            </div>
          </div>
        </Reveal>

        {/* Content column */}
        <div className="lg:col-span-7">
          <SectionHead
            dark
            eyebrow="لماذا المتخصص؟"
            title={
              <>
                لماذا تختار <span className="text-[#ff3b3b]">مركز المتخصص</span> لصيانة أجهزتك؟
              </>
            }
            text="لأن راحتك تبدأ من أول تواصل: وضوح، سرعة رد، وتغطية تصل إلى منطقتك."
          />

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 90}>
                <div className="group border-t border-white/15 pt-5 transition-colors duration-300 hover:border-brand-red">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-red text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                      <Icon name={w.icon as IconName} className="h-[22px] w-[22px]" />
                    </span>
                    <h3 className="text-[1.15rem] font-extrabold leading-snug">{w.title}</h3>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= خطوات طلب الصيانة ================= */
export function Steps() {
  return (
    <section id="steps" className="section bg-white">
      <div className="wrap">
        <SectionHead
          eyebrow="كيف يعمل الطلب"
          title={
            <>
              أربع خطوات بسيطة <span className="text-brand-green">حتى موعد الصيانة</span>
            </>
          }
          text="من أول رسالة حتى تأكيد الموعد — بدون تعقيد."
        />

        <ol className="relative mt-12 grid gap-8 md:mt-16 md:grid-cols-4 md:gap-6">
          {/* connector lines */}
          <span
            className="absolute inset-y-4 start-[27px] w-0.5 border-s-2 border-dashed border-ink/20 md:hidden"
            aria-hidden="true"
          />
          <span
            className="absolute inset-x-12 top-[27px] hidden h-0.5 border-t-2 border-dashed border-ink/20 md:block"
            aria-hidden="true"
          />

          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 110}>
                <div className="flex gap-5 md:block">
                  <span
                    className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl font-black text-white ring-8 ring-white ${
                      i === STEPS.length - 1 ? "bg-brand-green" : i === 0 ? "bg-brand-red" : "bg-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="md:mt-6">
                    <h3 className="t-sub">{s.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-16">
          <a href="#booking" className="btn btn-red">
            ابدأ طلب الصيانة
            <Icon name="arrow" className="h-5 w-5" />
          </a>
          <a
            href={waLink("السلام عليكم، أرغب في الاستفسار عن خدمات الصيانة.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <Icon name="whatsapp" className="h-5 w-5 text-brand-green" />
            أو راسلنا على واتساب
          </a>
          <span className="t-small text-ink/55 sm:ms-2">أو اتصل: <bdi dir="ltr">{BRAND.phone}</bdi></span>
        </Reveal>
      </div>
    </section>
  );
}
