import { Link } from "react-router-dom";
import FitText from "./FitText";
import { BRAND } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

export default function Hero() {
  const t = useT();
  const h = t.hero;

  return (
    <section
      id="hero"
      data-theme="photo"
      data-nav-ink="dark"
      className="relative w-full overflow-hidden rounded-none"
      aria-label="HOPE Bridge"
    >
      <div className="pointer-events-none absolute inset-0 rounded-none">
        <img
          src="/images/hero_bg-1600.jpg"
          srcSet="/images/hero_bg-640.jpg 640w, /images/hero_bg-1024.jpg 1024w, /images/hero_bg-1600.jpg 1600w, /images/hero_bg-2400.jpg 2400w"
          sizes="100vw"
          alt={t.alts.hero_bg}
          width={2400}
          height={1500}
          className="absolute inset-0 h-full w-full max-w-none rounded-none object-cover object-[50%_35%]"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0 rounded-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.22) 0%, rgba(0,0,0,.08) 40%, rgba(0,0,0,.55) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div
        className="stage relative flex flex-col justify-end rounded-none"
        style={{
          height: "min(86vh, 60vw)",
          minHeight: "480px",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
          paddingBottom: "clamp(20px, 3vw, 36px)",
        }}
      >
        <div className="relative z-10 mb-[clamp(8px,2vw,20px)] max-w-xl">
          <p
            className="font-sans text-cream drop-shadow-sm"
            style={{
              fontSize: "clamp(14px, 1.5vw, 17px)",
              lineHeight: 1.45,
              opacity: 0.95,
            }}
          >
            {h.line}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/don"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-orange)] px-7 font-sans font-medium text-white transition hover:opacity-90"
              style={{ fontSize: "13px" }}
            >
              {h.donate}
            </Link>
            <Link
              to="/missions"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-cream/70 bg-white/10 px-7 font-sans font-medium text-cream backdrop-blur-sm transition hover:bg-white/20"
              style={{ fontSize: "13px" }}
            >
              {h.actions}
            </Link>
          </div>
        </div>

        <div className="relative z-0 w-full overflow-visible">
          <div className="flex justify-center">
            <FitText
              as="h1"
              text={BRAND}
              targetCqw={90}
              className="text-cream"
              aria-label="HOPE Bridge for the Needy"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) {
          #hero .stage {
            height: min(78vh, 95vw) !important;
            min-height: 520px !important;
          }
        }
        @media (max-width: 599px) {
          #hero img { object-position: 50% 30%; }
        }
      `}</style>
    </section>
  );
}
