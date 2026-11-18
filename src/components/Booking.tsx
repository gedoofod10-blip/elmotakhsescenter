import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { BRAND, DEVICES, waLink } from "../data";
import { Icon, Reveal } from "./ui";

interface Values {
  name: string;
  device: string;
  brand: string;
  problem: string;
  area: string;
  address: string;
  date: string;
  slot: string;
}
type Field = keyof Values;

const AREAS = [...BRAND.coverage, "منطقة أخرى / غير متأكد"];
const SLOTS = [
  "أي وقت خلال ساعات العمل",
  "صباحاً (10:30 ص – 1:00 م)",
  "بعد الظهر (1:00 م – 4:30 م)",
  "مساءً (4:30 م – 8:00 م)",
  "طارئ — في أقرب وقت ممكن",
];
const BRANDS = [
  "شارب",
  "كاريير",
  "يونيون إير",
  "تورنادو",
  "فريش",
  "إل جي (LG)",
  "سامسونج",
  "بيكو",
  "بوش",
  "توشيبا",
  "زانوسي",
  "ميديا",
  "هيتاشي",
  "أريستون",
];

const empty: Values = {
  name: "",
  device: "",
  brand: "",
  problem: "",
  area: "",
  address: "",
  date: "",
  slot: SLOTS[0],
};

const todayStr = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const validators: Record<Field, (v: string) => string> = {
  name: (v) => (v.trim().length < 2 ? "اكتب اسمك (حرفان على الأقل)" : ""),
  device: (v) => (!v ? "اختر نوع الجهاز" : ""),
  brand: (v) => (v.trim().length < 2 ? "اكتب ماركة الجهاز، أو «لا أعرف»" : ""),
  problem: (v) =>
    v.trim().length < 10 ? "صف العطل بجملة واضحة (10 أحرف على الأقل)" : "",
  area: (v) => (!v ? "اختر المنطقة" : ""),
  address: (v) =>
    v.trim().length < 8 ? "اكتب العنوان بالتفصيل (الشارع/المنطقة/علامة مميزة)" : "",
  date: (v) => (!v ? "اختر الموعد المفضل" : v < todayStr() ? "اختر تاريخاً من اليوم فصاعداً" : ""),
  slot: () => "",
};

const ORDER: Field[] = ["name", "device", "brand", "problem", "area", "address", "date", "slot"];

function validateAll(v: Values) {
  const errs: Partial<Record<Field, string>> = {};
  ORDER.forEach((f) => {
    const e = validators[f](v[f]);
    if (e) errs[f] = e;
  });
  return errs;
}

function buildMessage(v: Values) {
  const dateText = new Date(v.date + "T00:00:00").toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return [
    "السلام عليكم، أرغب في حجز طلب صيانة 🛠️",
    "━━━━━━━━━━━━",
    `👤 الاسم: ${v.name.trim()}`,
    `📌 نوع الجهاز: ${v.device}`,
    `🏷️ الماركة: ${v.brand.trim()}`,
    `⚠️ وصف العطل: ${v.problem.trim()}`,
    `📍 المنطقة: ${v.area}`,
    `🏠 العنوان: ${v.address.trim()}`,
    `🗓️ الموعد المفضل: ${dateText} — ${v.slot}`,
    "━━━━━━━━━━━━",
    "برجاء التواصل معي لتأكيد الموعد. شكراً لكم.",
  ].join("\n");
}

export default function Booking({ preset }: { preset: { device: string; n: number } }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (preset.n > 0 && preset.device) {
      setValues((v) => ({ ...v, device: preset.device }));
      setErrors((e) => ({ ...e, device: undefined }));
      setSentUrl(null);
    }
  }, [preset]);

  const min = useMemo(todayStr, []);

  const set = (f: Field) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValues((v) => ({ ...v, [f]: val }));
    if (touched[f] || errors[f]) setErrors((er) => ({ ...er, [f]: validators[f](val) || undefined }));
    if (sentUrl) setSentUrl(null);
  };
  const blur = (f: Field) => () => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((er) => ({ ...er, [f]: validators[f](values[f]) || undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateAll(values);
    setErrors(errs);
    setTouched(Object.fromEntries(ORDER.map((f) => [f, true])));
    const first = ORDER.find((f) => errs[f]);
    if (first) {
      setSentUrl(null);
      const el = document.getElementById("f-" + first);
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      (el as HTMLElement | null)?.focus({ preventScroll: true });
      return;
    }
    const url = waLink(buildMessage(values));
    const w = window.open(url, "_blank");
    if (w) w.opener = null;
    setSentUrl(url);
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setTouched({});
    setSentUrl(null);
  };

  const common = (f: Field) => ({
    id: "f-" + f,
    name: f,
    value: values[f],
    onChange: set(f),
    onBlur: blur(f),
    "aria-invalid": errors[f] ? ("true" as const) : ("false" as const),
    "aria-describedby": errors[f] ? "e-" + f : undefined,
    className: "input",
  });

  return (
    <section id="booking" className="section bg-paper">
      <div className="wrap">
        <Reveal>
          <div className="grid overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_80px_-50px_rgba(0,12,0,0.5)] lg:grid-cols-5">
            {/* Info panel */}
            <div className="relative overflow-hidden bg-ink p-6 text-white sm:p-10 lg:col-span-2">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="absolute inset-x-0 top-0 h-1.5 tri" aria-hidden="true" />
              <div className="relative">
                <span className="eyebrow on-dark">نموذج الحجز</span>
                <h2 className="t-section mt-3">احجز طلب الصيانة في دقيقة</h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/70">
                  املأ البيانات وسنجهّز لك رسالة منظمة تُفتح مباشرة في واتساب لتُرسلها إلينا.
                </p>

                <ul className="mt-8 grid gap-4">
                  <InfoRow icon="phone" label="اتصال مباشر">
                    <a href={BRAND.tel} className="font-extrabold text-white hover:text-[#ff6a6a]" dir="ltr">
                      {BRAND.phone}
                    </a>
                  </InfoRow>
                  <InfoRow icon="whatsapp" label="واتساب">
                    <a
                      href={BRAND.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-white hover:text-[#6be585]"
                      dir="ltr"
                    >
                      {BRAND.phoneIntl}
                    </a>
                  </InfoRow>
                  <InfoRow icon="clock" label="مواعيد العمل">
                    <span className="font-bold">{BRAND.hours}</span>
                  </InfoRow>
                  <InfoRow icon="bolt" label="الطوارئ">
                    <span className="font-bold">واتساب على مدار 24 ساعة</span>
                  </InfoRow>
                </ul>

                <div className="mt-8 flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4">
                  <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb347]" />
                  <p className="t-small text-white/80">
                    إرسال النموذج <b>لا يعني تأكيد الحجز</b>. يتم التأكيد بعد تواصل المركز معك واتفاقنا على الموعد.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} noValidate className="p-6 sm:p-10 lg:col-span-3" aria-label="نموذج حجز الصيانة">
              <div className="grid gap-5 sm:grid-cols-2">
                <FieldWrap id="name" label="الاسم" error={errors.name}>
                  <input {...common("name")} type="text" autoComplete="name" placeholder="مثال: أحمد محمد" />
                </FieldWrap>

                <FieldWrap id="device" label="نوع الجهاز" error={errors.device}>
                  <select {...common("device")}>
                    <option value="">اختر الجهاز…</option>
                    {DEVICES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </FieldWrap>

                <FieldWrap id="brand" label="ماركة الجهاز" error={errors.brand}>
                  <input {...common("brand")} type="text" list="brands" autoComplete="off" placeholder="مثال: شارب" />
                  <datalist id="brands">
                    {BRANDS.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </FieldWrap>

                <FieldWrap id="area" label="المنطقة" error={errors.area}>
                  <select {...common("area")}>
                    <option value="">اختر المنطقة…</option>
                    {AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </FieldWrap>

                <div className="sm:col-span-2">
                  <FieldWrap id="problem" label="وصف العطل" error={errors.problem} hint={`${values.problem.trim().length} حرف`}>
                    <textarea
                      {...common("problem")}
                      rows={4}
                      placeholder="مثال: الغسالة لا تصرّف المياه ويظهر صوت غير عادي أثناء العصر…"
                    />
                  </FieldWrap>
                </div>

                <div className="sm:col-span-2">
                  <FieldWrap id="address" label="العنوان" error={errors.address}>
                    <input
                      {...common("address")}
                      type="text"
                      autoComplete="street-address"
                      placeholder="الشارع، رقم المبنى، علامة مميزة"
                    />
                  </FieldWrap>
                </div>

                <FieldWrap id="date" label="تاريخ الموعد المفضل" error={errors.date}>
                  <input {...common("date")} type="date" min={min} />
                </FieldWrap>

                <FieldWrap id="slot" label="الفترة المفضلة" error={errors.slot}>
                  <select {...common("slot")}>
                    {SLOTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </FieldWrap>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn btn-wa sm:min-w-[15rem]">
                  <Icon name="whatsapp" className="h-5 w-5" />
                  أرسل الطلب عبر واتساب
                </button>
                <button type="button" onClick={reset} className="btn btn-outline">
                  مسح البيانات
                </button>
              </div>

              <div aria-live="polite" role="status">
                {sentUrl && (
                  <div className="mt-6 flex gap-3 rounded-2xl border border-brand-green/40 bg-[#eef8f0] p-4 [animation:err-in_0.5s_var(--ease-out-expo)]">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-green text-white">
                      <Icon name="check" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-extrabold">تم تجهيز رسالتك وفتح واتساب</p>
                      <p className="t-small mt-1 text-ink/70">
                        اضغط «إرسال» داخل واتساب لإتمام الطلب. هذا ليس تأكيداً للحجز — سيتواصل معك المركز لتأكيد الموعد.
                      </p>
                      <a
                        href={sentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-green-dark underline underline-offset-4"
                      >
                        لم يفتح واتساب؟ اضغط هنا
                        <Icon name="external" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FieldWrap({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <div className="flex items-baseline justify-between">
        <label htmlFor={"f-" + id} className="lbl">
          {label} <span className="text-brand-red" aria-hidden="true">*</span>
        </label>
        {hint && <span className="t-small text-ink/40">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={"e-" + id} className="err" role="alert">
          <Icon name="alert" className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: "phone" | "whatsapp" | "clock" | "bolt";
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="t-small text-white/55">{label}</p>
        <p className="text-[0.95rem]">{children}</p>
      </div>
    </li>
  );
}
