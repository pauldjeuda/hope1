import { Link } from "react-router-dom";
import { BIG_WORD } from "../content/landing";
import FitText from "./FitText";
import { useT } from "../i18n/LocaleContext";

export default function Engage() {
  const t = useT();
  const e = t.engage;

  return (
    <section
      id="agir"
      data-theme="light"
      className="relative w-full bg-page"
      style={{ scrollMarginTop: "5rem" }}
      aria-labelledby="engage-title"
    >
      <div
        className="stage"
        style={{
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
          paddingBlock: "clamp(48px, calc(var(--u) * 7), 88px)",
        }}
      >
        <div className="grid items-center gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-14">
          <div className="reveal relative order-2 min-[900px]:order-1">
            <div
              className="pointer-events-none absolute -left-[4%] top-[18%] z-0 w-[110%] text-sage-soft opacity-40"
              aria-hidden
            >
              <FitText text={BIG_WORD} targetCqw={48} className="text-sage-soft" wide={false} />
            </div>
            <div className="relative z-10 overflow-hidden">
              <img
                src="/images/allinone_b-1600.jpg"
                alt={t.alts.allinone_b}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal order-1 min-[900px]:order-2">
            <h2
              id="engage-title"
              className="font-sans font-medium text-ink-green"
              style={{
                fontSize: "clamp(26px, calc(var(--u) * 3.4), 40px)",
                lineHeight: 1.15,
              }}
            >
              {e.titleLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < e.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p
              className="mt-4 font-sans font-medium text-ink-green/80"
              style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.45 }}
            >
              {e.lead}
            </p>
            <p
              className="mt-3 max-w-md font-sans text-ink opacity-85"
              style={{ fontSize: "clamp(14px, 1.35vw, 16px)", lineHeight: 1.55 }}
            >
              {e.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink-green px-7 font-sans font-medium text-cream transition hover:opacity-90"
                style={{ fontSize: "13px" }}
              >
                {e.contactCta}
              </Link>
              <Link
                to="/a-propos"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-outline px-7 font-sans font-medium text-outline transition hover:opacity-80"
                style={{ fontSize: "13px" }}
              >
                {e.aboutCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
