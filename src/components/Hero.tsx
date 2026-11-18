import { BRAND, img, waLink } from "../data";
import { Icon, Reveal, useOpenStatus } from "./ui";

export default function Hero() {
  const open = useOpenStatus();

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-ink pb-24 pt-10 text-white sm:pt-14 md:pb-28 lg:pt-20">
        {/* decorative layers */}
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full border border-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-24 top-[calc(33%+4rem)] h-[22rem] w-[22rem] rounded-full border border-brand-red/40"
          aria-hidden="true"
        />

        <div className="wrap relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="hero-in" style={{ ["--d" as string]: "50ms" }}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pe-4 ps-3 text-[0.8125rem] font-bold">
                <span
                  className={`live-dot h-2.5 w-2.5 rounded-full ${
                    open === false ? "bg-brand-red" : "bg-[#3ddc57]"
                  }`}
                  style={open === false ? { animation: "none" } : undefined}
                />
                {open === null
                  ? "مواعيد العمل: يومياً 10:30 ص – 8:00 م"
                  : open
                  ? "مفتوح الآن — حتى 8:00 مساءً"
                  : "خارج ساعات العمل — راسلنا على واتساب وسنرد عليك"}
              </span>
            </div>

            <h1 className="t-display mt-6 hero-in" style={{ ["--d" as string]: "150ms" }}>
              صيانة جميع أجهزتك المنزلية
              <span className="block text-[#ff3b3b]">بإتقان وراحة بال.</span>
            </h1>

            <p
              className="t-lead hero-in mt-5 max-w-[34rem] text-white/75"
              style={{ ["--d" as string]: "260ms" }}
            >
              تكييفات، غسالات، ثلاجات، أجهزة طهي، سخانات وأكثر — في شبرا الخيمة والقليوبية والقاهرة الكبرى.
              صف العطل واحجز موعدك في دقائق عبر واتساب.
            </p>

            <div
              className="hero-in mt-8 grid gap-3 sm:flex sm:flex-wrap"
              style={{ ["--d" as string]: "370ms" }}
            >
              <a
                href={waLink("السلام عليكم، أرغب في حجز طلب صيانة. برجاء التواصل معي.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                احجز عبر واتساب
              </a>
              <a href={BRAND.tel} className="btn btn-outline-light">
                <Icon name="phone" className="h-5 w-5" />
                اتصل الآن
                <span dir="ltr" className="text-white/70">
                  {BRAND.phone}
                </span>
              </a>
            </div>

            <ul
              className="hero-in mt-9 grid max-w-xl gap-3 text-[0.9375rem] text-white/80 sm:grid-cols-2"
              style={{ ["--d" as string]: "480ms" }}
            >
              {[
                { i: "clock", t: "يومياً 10:30 ص – 8:00 م" },
                { i: "bolt", t: "طوارئ واتساب على مدار 24 ساعة" },
              ].map((x) => (
                <li key={x.t} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[#ff6a6a]">
                    <Icon name={x.i as "clock" | "bolt"} className="h-[18px] w-[18px]" />
                  </span>
                  {x.t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="hero-in relative lg:col-span-5" style={{ ["--d" as string]: "250ms" }}>
            <div
              className="absolute -bottom-3 -start-3 hidden h-full w-full border-2 border-brand-red/70 sm:block"
              style={{ clipPath: "polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 44px 100%, 0 calc(100% - 44px))" }}
              aria-hidden="true"
            />
            <div className="chamfer relative aspect-[4/3] overflow-hidden bg-ink-2 sm:aspect-[16/11] lg:aspect-[4/5]">
              <img
                src={img(4221389, 1100)}
                srcSet={`${img(4221389, 640)} 640w, ${img(4221389, 1100)} 1100w`}
                sizes="(min-width:1024px) 40vw, 100vw"
                alt="مطبخ منزلي حديث بأجهزة منزلية"
                width={1100}
                height={733}
                fetchPriority="high"
                className="h-full w-full object-cover"
                style={{ objectPosition: "60% 50%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />

              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 sm:inset-x-5 sm:bottom-5">
                <div className="rounded-2xl bg-white p-3 text-ink shadow-xl sm:p-4">
                  <div className="flex items-center gap-1 text-[#f5a300]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Icon key={i} name="star" className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="mt-1 text-2xl font-black leading-none">
                    4.6<span className="text-sm font-bold text-ink/50"> / 5</span>
                  </p>
                  <p className="mt-1 text-xs font-bold text-ink/60">التقييم المقدَّم للمركز</p>
                </div>
                <div className="rounded-2xl bg-brand-red px-3.5 py-2.5 text-center text-white sm:px-4">
                  <p className="text-xs font-semibold text-white/80">شعارنا</p>
                  <p className="text-base font-black">{BRAND.slogan}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section aria-label="مؤشرات الثقة" className="relative z-10 -mt-14 md:-mt-16">
        <div className="wrap">
          <Reveal>
            <div className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_30px_60px_-40px_rgba(0,12,0,0.5)] lg:grid-cols-4">
              <TrustItem
                icon="star"
                value="4.6"
                suffix="/ 5"
                label="التقييم المقدَّم للمركز"
                accent="text-[#f5a300]"
              />
              <TrustItem icon="clock" value="10:30 – 8:00" label="يومياً، صباحاً حتى مساءً" small />
              <TrustItem icon="bolt" value="24 ساعة" label="استقبال طوارئ واتساب" accent="text-brand-green" />
              <TrustItem icon="wrench" value="6 أقسام" label="لصيانة جميع الأجهزة المنزلية" accent="text-brand-red" last />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function TrustItem({
  icon,
  value,
  suffix,
  label,
  accent = "text-ink",
  small,
  last,
}: {
  icon: "star" | "clock" | "bolt" | "wrench";
  value: string;
  suffix?: string;
  label: string;
  accent?: string;
  small?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 p-4 sm:p-6 ${
        last ? "" : "lg:border-e lg:border-line"
      } border-line [&:nth-child(odd)]:border-e [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:nth-child(odd)]:border-e`}
    >
      <Icon name={icon} className={`h-6 w-6 ${accent}`} />
      <p className={`font-black leading-tight ${small ? "text-[1.15rem] sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
        {value}
        {suffix && <span className="text-base font-bold text-ink/40"> {suffix}</span>}
      </p>
      <p className="t-small font-semibold text-ink/65">{label}</p>
    </div>
  );
}
