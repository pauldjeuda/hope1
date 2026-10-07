import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Lock,
  Mail,
  Shield,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { PaymentLogo, PaymentMark } from "../components/PaymentLogos";
import { CONTACT, DONATE_AMOUNTS, PAYMENTS } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

type MethodId = "mtn" | "orange";
type Step = 1 | 2 | 3;

function formatAmount(n: number) {
  return n.toLocaleString("fr-FR");
}

export default function DonatePage() {
  const t = useT();
  const page = t.pages.donate;
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<number | "custom">(10000);
  const [custom, setCustom] = useState("");
  const [allocation, setAllocation] = useState("general");
  const [method, setMethod] = useState<MethodId | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const selectedAmount = useMemo(() => {
    if (amount === "custom") {
      const n = Number(custom.replace(/\s/g, ""));
      return Number.isFinite(n) && n > 0 ? n : null;
    }
    return amount;
  }, [amount, custom]);

  const payment = method ? PAYMENTS[method] : null;
  const allocLabel =
    page.allocations.find((a) => a.id === allocation)?.label ?? allocation;

  const mailHref = useMemo(() => {
    const amt = selectedAmount
      ? `${formatAmount(selectedAmount)} ${page.currency}`
      : "—";
    const op = payment?.short ?? "MTN MoMo / Orange Money";
    const subject = encodeURIComponent(`Don HOPE Bridge — ${amt}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe confirme mon don à HOPE Bridge for the Needy.\n\nMontant : ${amt}\nAffectation : ${allocLabel}\nOpérateur : ${op}\nDate : \nRéférence : ${PAYMENTS.referenceHint}\n\nMerci.`,
    );
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }, [allocLabel, page.currency, payment?.short, selectedAmount]);

  async function copyText(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""));
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  }

  const stepsMeta = [
    { n: 1 as const, label: page.stepAmount },
    { n: 2 as const, label: page.stepPay },
    { n: 3 as const, label: page.stepDone },
  ];

  const canContinueStep1 = selectedAmount !== null;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <section className="container-x py-10 min-[800px]:py-14">
        {/* Stepper */}
        <ol className="mx-auto mb-10 flex max-w-xl items-center justify-between gap-2">
          {stepsMeta.map((s, i) => {
            const done = step > s.n;
            const active = step === s.n;
            return (
              <li key={s.n} className="flex flex-1 items-center gap-2">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      done
                        ? "bg-forest text-cream"
                        : active
                          ? "bg-mustard text-forest-deep shadow-[0_0_0_4px_rgba(232,185,45,0.28)]"
                          : "bg-soft text-muted"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : s.n}
                  </span>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wide ${
                      active || done ? "text-forest" : "text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stepsMeta.length - 1 && (
                  <div
                    className={`mb-5 h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                      step > s.n ? "bg-forest" : "bg-soft"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mx-auto grid max-w-5xl gap-8 min-[960px]:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="animate-[fadeIn_0.35s_ease] space-y-8 rounded-3xl bg-card p-6 shadow-card min-[700px]:p-8">
                <div>
                  <h2 className="text-xl font-bold text-ink">{page.amountsTitle}</h2>
                  <div className="mt-4 grid grid-cols-2 gap-3 min-[520px]:grid-cols-4">
                    {DONATE_AMOUNTS.map((n) => {
                      const selected = amount === n;
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setAmount(n)}
                          className={`rounded-2xl border-2 px-3 py-4 text-center transition-all duration-200 ${
                            selected
                              ? "border-mustard bg-mustard/15 shadow-[0_4px_16px_rgba(232,185,45,0.25)]"
                              : "border-transparent bg-soft hover:border-forest/15"
                          }`}
                        >
                          <span className="block text-lg font-extrabold text-forest">
                            {formatAmount(n)}
                          </span>
                          <span className="text-xs font-semibold text-muted">
                            {page.currency}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAmount("custom")}
                    className={`mt-3 w-full rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all ${
                      amount === "custom"
                        ? "border-mustard bg-mustard/15 text-forest"
                        : "border-transparent bg-soft text-forest hover:border-forest/15"
                    }`}
                  >
                    {page.customLabel}
                  </button>
                  {amount === "custom" && (
                    <div className="mt-3 flex items-center gap-2 rounded-2xl bg-soft px-4 py-3">
                      <input
                        type="number"
                        min={100}
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        placeholder={page.customPlaceholder}
                        className="w-full bg-transparent text-lg font-bold text-forest outline-none"
                        autoFocus
                      />
                      <span className="shrink-0 text-sm font-semibold text-muted">
                        {page.currency}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-ink">{page.allocationTitle}</h2>
                  <div className="mt-4 space-y-2">
                    {page.allocations.map((a) => {
                      const selected = allocation === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setAllocation(a.id)}
                          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm transition-all ${
                            selected
                              ? "bg-sage-bg font-semibold text-forest"
                              : "bg-soft text-ink hover:bg-sage-bg/60"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              selected
                                ? "border-forest bg-forest"
                                : "border-muted/40"
                            }`}
                          >
                            {selected && <Check className="h-3 w-3 text-cream" />}
                          </span>
                          {a.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    disabled={!canContinueStep1}
                    onClick={() => setStep(2)}
                    className="btn-mustard disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {page.continue}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="animate-[fadeIn_0.35s_ease] space-y-6 rounded-3xl bg-card p-6 shadow-card min-[700px]:p-8">
                <div>
                  <h2 className="text-xl font-bold text-ink">{page.methodsTitle}</h2>
                  <p className="mt-2 text-sm text-muted">{page.methodsLead}</p>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  {page.pickMethod}
                </p>

                <div className="grid gap-3 min-[560px]:grid-cols-2">
                  {(["mtn", "orange"] as const).map((id) => {
                    const m = PAYMENTS[id];
                    const selected = method === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMethod(id)}
                        className={`group relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                          selected
                            ? "border-forest bg-soft shadow-[0_8px_24px_rgba(63,74,46,0.12)]"
                            : "border-transparent bg-soft/70 hover:border-forest/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <PaymentMark brand={id} />
                          <div className="min-w-0">
                            <p className="font-bold text-ink">{m.short}</p>
                            <p className="text-xs text-muted">{m.label}</p>
                          </div>
                          {selected && (
                            <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-forest text-cream">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>
                        <div className="mt-3">
                          <PaymentLogo brand={id} className="h-9 w-auto" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {payment && (
                  <div className="animate-[fadeIn_0.3s_ease] space-y-4 rounded-2xl border border-forest/10 bg-page p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <PaymentLogo
                        brand={method!}
                        className="h-10 w-auto"
                      />
                      <span className="rounded-full bg-mustard/25 px-3 py-1 text-xs font-bold text-forest-deep">
                        {page.sendNow}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {page.numberLabel}
                      </p>
                      <p className="mt-1 font-mono text-2xl font-extrabold tracking-wider text-forest">
                        {payment.number}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {page.nameLabel}
                      </p>
                      <p className="mt-0.5 text-sm text-ink">{payment.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => copyText("num", payment.number)}
                        className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition hover:opacity-90"
                      >
                        {copied === "num" ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied === "num" ? page.copied : page.copyNumber}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          copyText("ref", PAYMENTS.referenceHint)
                        }
                        className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-2.5 text-sm font-semibold text-forest transition hover:bg-sage-bg"
                      >
                        {copied === "ref" ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied === "ref" ? page.copied : page.copyRef}
                      </button>
                    </div>

                    <div className="rounded-xl bg-card px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {page.referenceLabel}
                      </p>
                      <p className="mt-1 text-xl font-extrabold tracking-wide text-forest">
                        {PAYMENTS.referenceHint}
                      </p>
                      <p className="mt-1 text-xs text-muted">{page.referenceHint}</p>
                    </div>

                    <p className="text-xs text-muted">{page.placeholderNote}</p>
                  </div>
                )}

                <ol className="space-y-2.5">
                  <p className="text-sm font-bold text-ink">{page.stepsTitle}</p>
                  {page.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-muted">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-bg text-xs font-bold text-forest">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{s}</span>
                    </li>
                  ))}
                </ol>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest hover:bg-soft"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {page.back}
                  </button>
                  <button
                    type="button"
                    disabled={!method}
                    onClick={() => setStep(3)}
                    className="btn-mustard disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {page.continue}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="animate-[fadeIn_0.35s_ease] space-y-6 rounded-3xl bg-card p-6 shadow-card min-[700px]:p-8">
                <div className="rounded-2xl bg-forest px-5 py-6 text-cream">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mustard text-forest-deep">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold">{page.confirmTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-cream/85">
                    {page.confirmText}
                  </p>
                  <a href={mailHref} className="btn-mustard mt-5">
                    {page.confirmCta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {payment && selectedAmount && (
                  <div className="rounded-2xl bg-soft p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      {page.summaryTitle}
                    </p>
                    <dl className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">{page.stepAmount}</dt>
                        <dd className="font-bold text-forest">
                          {formatAmount(selectedAmount)} {page.currency}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">{page.methodsTitle}</dt>
                        <dd className="font-semibold text-ink">{payment.short}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">{page.allocationTitle}</dt>
                        <dd className="max-w-[55%] text-right font-semibold text-ink">
                          {allocLabel}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted">{page.referenceLabel}</dt>
                        <dd className="font-mono font-bold text-forest">
                          {PAYMENTS.referenceHint}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-forest hover:bg-soft"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {page.back}
                </button>
              </div>
            )}
          </div>

          {/* Trust sidebar */}
          <aside className="space-y-4 min-[960px]:sticky min-[960px]:top-24 min-[960px]:self-start">
            <div className="rounded-3xl bg-sage-bg/70 p-5">
              <div className="mb-3 flex items-center gap-2 font-bold text-forest">
                <Shield className="h-4 w-4" />
                {page.trustTitle}
              </div>
              <ul className="space-y-2.5">
                {page.trustItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-forest/85">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2.5 rounded-2xl bg-card p-4 shadow-card">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              <p className="text-xs leading-relaxed text-muted">{page.secureNote}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 px-1">
              <PaymentLogo brand="mtn" className="h-8 w-auto opacity-90" />
              <PaymentLogo brand="orange" className="h-8 w-auto opacity-90" />
            </div>

            {selectedAmount && (
              <div className="rounded-2xl border border-forest/10 bg-card px-4 py-3">
                <p className="text-xs text-muted">{page.summaryTitle}</p>
                <p className="text-lg font-extrabold text-forest">
                  {formatAmount(selectedAmount)} {page.currency}
                </p>
                {payment && (
                  <p className="mt-0.5 text-sm font-semibold text-muted">
                    {payment.short}
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
