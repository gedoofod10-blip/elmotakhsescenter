import { SERVICES, img, waLink, type Service } from "../data";
import { Icon, Reveal, SectionHead } from "./ui";

export default function Services({ onPick }: { onPick: (device: string) => void }) {
  return (
    <section id="services" className="section grid-bg-light bg-paper">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            eyebrow="خدمات الصيانة"
            title={
              <>
                ستة أقسام، <span className="text-brand-red">وجهة واحدة</span> لأجهزة بيتك
              </>
            }
            text="اختر القسم المناسب وأرسل طلبك مباشرة عبر واتساب برسالة جاهزة، أو استخدم نموذج الحجز لتفصيل العطل."
          />
        </div>

        <div className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} className={`flex ${s.span}`} delay={(i % 2) * 90}>
              {s.variant === "overlay" ? (
                <OverlayCard s={s} onPick={onPick} />
              ) : (
                <LightCard s={s} onPick={onPick} />
              )}
            </Reveal>
          ))}
        </div>

        <p className="t-small mt-8 text-center text-ink/50">
          الصور المعروضة في الموقع توضيحية للخدمات.
        </p>
      </div>
    </section>
  );
}

function Actions({
  s,
  onPick,
  dark,
}: {
  s: Service;
  onPick: (d: string) => void;
  dark?: boolean;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2.5">
      <a
        href={waLink(s.waText)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-wa btn-sm"
        aria-label={`اطلب صيانة ${s.title} عبر واتساب`}
      >
        <Icon name="whatsapp" className="h-[18px] w-[18px]" />
        اطلب عبر واتساب
      </a>
      <a
        href="#booking"
        onClick={() => onPick(s.device)}
        className={`btn btn-sm ${dark ? "btn-outline-light" : "btn-outline"}`}
      >
        نموذج الحجز
        <Icon name="arrow" className="h-4 w-4" />
      </a>
    </div>
  );
}

function OverlayCard({ s, onPick }: { s: Service; onPick: (d: string) => void }) {
  return (
    <article className="svc group relative isolate flex min-h-[27rem] w-full flex-col justify-between overflow-hidden rounded-[20px] bg-ink p-5 text-white sm:p-7 lg:min-h-[30rem]">
      <img
        src={img(s.photo, 1100)}
        srcSet={`${img(s.photo, 640)} 640w, ${img(s.photo, 1100)} 1100w`}
        sizes="(min-width:1024px) 55vw, 100vw"
        alt={s.alt}
        loading="lazy"
        decoding="async"
        width={1100}
        height={733}
        className="svc-img absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/65 to-ink/15" />
      <div className="absolute inset-x-0 top-0 -z-10 h-1 bg-brand-red" />

      <div className="flex items-start justify-between">
        <span className="text-5xl font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)]">
          {s.num}
        </span>
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/12 text-white backdrop-blur-md ring-1 ring-white/25">
          <Icon name={s.icon} className="h-6 w-6" />
        </span>
      </div>

      <div>
        <h3 className="t-sub max-w-md">{s.title}</h3>
        <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-white/80">{s.desc}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="أعطال شائعة">
          {s.issues.map((x) => (
            <li key={x} className="chip bg-white/12 text-white ring-1 ring-white/20">
              {x}
            </li>
          ))}
        </ul>
        <Actions s={s} onPick={onPick} dark />
      </div>
    </article>
  );
}

function LightCard({ s, onPick }: { s: Service; onPick: (d: string) => void }) {
  return (
    <article className="svc group card flex w-full flex-col overflow-hidden">
      <div className="relative min-h-[13rem] flex-1 overflow-hidden sm:min-h-[15rem]">
        <img
          src={img(s.photo, 900)}
          srcSet={`${img(s.photo, 560)} 560w, ${img(s.photo, 900)} 900w`}
          sizes="(min-width:1024px) 40vw, 100vw"
          alt={s.alt}
          loading="lazy"
          decoding="async"
          width={900}
          height={600}
          className="svc-img absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute start-4 top-4 rounded-lg bg-white px-3 py-1 text-sm font-black text-ink">
          {s.num}
        </span>
        <span className="absolute -bottom-0 end-4 grid h-14 w-14 translate-y-1/2 place-items-center rounded-2xl bg-brand-red text-white shadow-lg">
          <Icon name={s.icon} className="h-7 w-7" />
        </span>
      </div>
      <div className="p-5 pt-8 sm:p-7 sm:pt-9">
        <h3 className="t-sub">{s.title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70">{s.desc}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="أعطال شائعة">
          {s.issues.map((x) => (
            <li key={x} className="chip bg-paper text-ink/75 ring-1 ring-line">
              {x}
            </li>
          ))}
        </ul>
        <Actions s={s} onPick={onPick} />
      </div>
    </article>
  );
}
