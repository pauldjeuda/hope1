import { Link } from "react-router-dom";
import { useT } from "../i18n/LocaleContext";

export default function DonateBanner() {
  const t = useT();
  const b = t.donateBanner;

  return (
    <section
      id="soutenir"
      data-theme="dark"
      className="relative w-full bg-ink-green text-cream"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div
        className="stage flex flex-col items-start gap-6 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between"
        style={{
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
          paddingBlock: "clamp(40px, 6vw, 64px)",
        }}
      >
        <div className="reveal max-w-xl">
          <h2
            className="font-display tracking-tight"
            style={{ fontSize: "clamp(32px, 4.5vw, 48px)", lineHeight: 1.05 }}
          >
            {b.title}
          </h2>
          <p
            className="mt-3 font-sans opacity-85"
            style={{ fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.55 }}
          >
            {b.text}
          </p>
        </div>
        <Link
          to="/don"
          className="reveal inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-orange)] px-8 font-sans font-medium text-white transition hover:opacity-90"
          style={{ fontSize: "14px" }}
        >
          {b.cta}
        </Link>
      </div>
    </section>
  );
}
