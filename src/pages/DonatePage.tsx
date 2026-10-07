import { useMemo, useState } from "react";
import { Check, Copy, Shield } from "lucide-react";
import PageHero from "../components/PageHero";
import { CONTACT, DONATE_AMOUNTS, PAYMENTS } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

function formatAmount(n: number) {
  return n.toLocaleString("fr-FR");
}

export default function DonatePage() {
  const t = useT();
  const page = t.pages.donate;
  const [amount, setAmount] = useState<number | "custom">(10000);
  const [custom, setCustom] = useState("");
  const [allocation, setAllocation] = useState("general");
  const [copied, setCopied] = useState<string | null>(null);

  const selectedAmount = useMemo(() => {
    if (amount === "custom") {
      const n = Number(custom.replace(/\s/g, ""));
      return Number.isFinite(n) && n > 0 ? n : null;
    }
    return amount;
  }, [amount, custom]);

  const mailHref = useMemo(() => {
    const alloc =
      page.allocations.find((a) => a.id === allocation)?.label ?? allocation;
    const amt = selectedAmount
      ? `${formatAmount(selectedAmount)} ${page.currency}`
      : "—";
    const subject = encodeURIComponent(`Don HOPE Bridge — ${amt}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe confirme mon don à HOPE Bridge for the Needy.\n\nMontant : ${amt}\nAffectation : ${alloc}\nOpérateur : MTN MoMo / Orange Money\nDate : \nRéférence : ${PAYMENTS.referenceHint}\n\nMerci.`,
    );
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }, [allocation, page.allocations, page.currency, selectedAmount]);

  async function copyText(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""));
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        tone="light"
      />

      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBottom: "clamp(48px, 8vw, 96px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage grid gap-14 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:items-start">
          <div className="space-y-12">
            <div>
              <h2
                className="font-sans font-medium text-ink-green"
                style={{ fontSize: "clamp(20px, 2.4vw, 26px)" }}
              >
                {page.whyTitle}
              </h2>
              <p
                className="mt-3 max-w-xl font-sans text-ink opacity-85"
                style={{ fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.6 }}
              >
                {page.why}
              </p>
            </div>

            <div>
              <h2
                className="font-sans font-medium text-ink-green"
                style={{ fontSize: "clamp(20px, 2.4vw, 26px)" }}
              >
                {page.amountsTitle}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {DONATE_AMOUNTS.map((n) => {
                  const active = amount === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setAmount(n)}
                      className={`rounded-full border px-4 py-2.5 font-sans transition ${
                        active
                          ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-white"
                          : "border-outline/50 text-ink-green hover:border-[var(--brand-orange)]"
                      }`}
                      style={{ fontSize: "14px" }}
                    >
                      {formatAmount(n)} {page.currency}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setAmount("custom")}
                  className={`rounded-full border px-4 py-2.5 font-sans transition ${
                    amount === "custom"
                      ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-white"
                      : "border-outline/50 text-ink-green hover:border-[var(--brand-orange)]"
                  }`}
                  style={{ fontSize: "14px" }}
                >
                  {page.customLabel}
                </button>
              </div>
              {amount === "custom" && (
                <label className="mt-4 block max-w-xs">
                  <span className="sr-only">{page.customLabel}</span>
                  <div className="flex items-center gap-2 border-b border-ink-green/25 pb-1">
                    <input
                      type="number"
                      min={100}
                      inputMode="numeric"
                      placeholder={page.customPlaceholder}
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      className="w-full bg-transparent font-sans text-ink-green outline-none"
                      style={{ fontSize: "18px" }}
                    />
                    <span className="shrink-0 text-sm text-ink opacity-60">
                      {page.currency}
                    </span>
                  </div>
                </label>
              )}
            </div>

            <div>
              <h2
                className="font-sans font-medium text-ink-green"
                style={{ fontSize: "clamp(20px, 2.4vw, 26px)" }}
              >
                {page.allocationTitle}
              </h2>
              <div className="mt-4 flex flex-col gap-2">
                {page.allocations.map((a) => (
                  <label
                    key={a.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                      allocation === a.id
                        ? "border-sage bg-sage/10"
                        : "border-transparent bg-black/[0.03] hover:bg-black/[0.05]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="allocation"
                      value={a.id}
                      checked={allocation === a.id}
                      onChange={() => setAllocation(a.id)}
                      className="accent-[var(--sage)]"
                    />
                    <span className="font-sans text-ink" style={{ fontSize: "14px" }}>
                      {a.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="font-sans font-medium text-ink-green"
                style={{ fontSize: "clamp(20px, 2.4vw, 26px)" }}
              >
                {page.stepsTitle}
              </h2>
              <ol className="mt-4 space-y-3">
                {page.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 font-sans text-ink opacity-85">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-green font-medium text-cream"
                      style={{ fontSize: "12px" }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "14px", lineHeight: 1.5, paddingTop: 4 }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-6 min-[900px]:sticky min-[900px]:top-24">
            <div>
              <h2
                className="font-sans font-medium text-ink-green"
                style={{ fontSize: "clamp(20px, 2.4vw, 26px)" }}
              >
                {page.methodsTitle}
              </h2>
              <p
                className="mt-2 font-sans text-ink opacity-75"
                style={{ fontSize: "14px", lineHeight: 1.5 }}
              >
                {page.methodsLead}
              </p>
              <p
                className="mt-2 font-sans text-ink opacity-55"
                style={{ fontSize: "12px", lineHeight: 1.4 }}
              >
                {page.placeholderNote}
              </p>
            </div>

            <PaymentCard
              method={PAYMENTS.mtn}
              numberLabel={page.numberLabel}
              nameLabel={page.nameLabel}
              copyLabel={page.copyNumber}
              copiedLabel={page.copied}
              copied={copied === "mtn"}
              onCopy={() => copyText("mtn", PAYMENTS.mtn.number)}
            />
            <PaymentCard
              method={PAYMENTS.orange}
              numberLabel={page.numberLabel}
              nameLabel={page.nameLabel}
              copyLabel={page.copyNumber}
              copiedLabel={page.copied}
              copied={copied === "orange"}
              onCopy={() => copyText("orange", PAYMENTS.orange.number)}
            />

            <div className="rounded-2xl border border-ink-green/10 bg-white/50 px-5 py-4">
              <p className="font-sans text-xs uppercase tracking-[0.12em] text-ink-green opacity-55">
                {page.referenceLabel}
              </p>
              <p className="mt-1 font-display text-2xl text-ink-green tracking-wide">
                {PAYMENTS.referenceHint}
              </p>
              <p className="mt-1 font-sans text-sm text-ink opacity-65">
                {page.referenceHint}
              </p>
              {selectedAmount && (
                <p className="mt-3 font-sans text-sm text-ink-green">
                  {formatAmount(selectedAmount)} {page.currency}
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-ink-green px-5 py-5 text-cream">
              <h3 className="font-sans font-medium" style={{ fontSize: "16px" }}>
                {page.confirmTitle}
              </h3>
              <p
                className="mt-2 opacity-85"
                style={{ fontSize: "13px", lineHeight: 1.5 }}
              >
                {page.confirmText}
              </p>
              <a
                href={mailHref}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-orange)] px-6 font-sans font-medium text-white transition hover:opacity-90"
                style={{ fontSize: "14px" }}
              >
                {page.confirmCta}
              </a>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-ink-green">
                <Shield strokeWidth={1.4} className="h-4 w-4 opacity-70" />
                <h3 className="font-sans font-medium" style={{ fontSize: "14px" }}>
                  {page.trustTitle}
                </h3>
              </div>
              <ul className="space-y-1.5 font-sans text-ink opacity-75" style={{ fontSize: "13px" }}>
                {page.trustItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check strokeWidth={1.5} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PaymentCard({
  method,
  numberLabel,
  nameLabel,
  copyLabel,
  copiedLabel,
  copied,
  onCopy,
}: {
  method: (typeof PAYMENTS)["mtn"] | (typeof PAYMENTS)["orange"];
  numberLabel: string;
  nameLabel: string;
  copyLabel: string;
  copiedLabel: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-black/5 shadow-[0_8px_28px_rgba(36,50,74,0.08)]"
      style={{ background: "#fff" }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ background: method.color, color: method.ink }}
      >
        <span className="font-sans font-semibold tracking-wide" style={{ fontSize: "15px" }}>
          {method.label}
        </span>
        <span className="font-sans text-xs opacity-80">{method.short}</span>
      </div>
      <div className="space-y-3 px-5 py-4">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.1em] text-ink opacity-50">
            {numberLabel}
          </p>
          <p className="mt-0.5 font-sans text-xl font-medium tracking-wide text-ink-green">
            {method.number}
          </p>
        </div>
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.1em] text-ink opacity-50">
            {nameLabel}
          </p>
          <p className="mt-0.5 font-sans text-sm text-ink opacity-80">{method.name}</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-full border border-outline/40 px-4 py-2 font-sans text-ink-green transition hover:border-sage hover:bg-sage/10"
          style={{ fontSize: "13px" }}
        >
          {copied ? (
            <Check strokeWidth={1.5} className="h-3.5 w-3.5 text-sage" />
          ) : (
            <Copy strokeWidth={1.5} className="h-3.5 w-3.5" />
          )}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
    </div>
  );
}
