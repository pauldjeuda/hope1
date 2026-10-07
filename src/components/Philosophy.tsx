import { Link } from "react-router-dom";
import { useT } from "../i18n/LocaleContext";

function MissionFeature({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <div className={`relative mx-auto ${className}`}>
      <div className="relative" style={{ transform: "rotate(-3deg)" }}>
        <img
          src="/images/mission.jpg"
          alt={t.alts.mission}
          width={1400}
          height={1400}
          className="relative z-10 h-auto w-full"
          style={{
            filter: "drop-shadow(-14px 18px 20px rgba(60,40,20,.26))",
          }}
          loading="lazy"
          decoding="async"
        />

        <div
          className="absolute z-20 flex items-center justify-center bg-ink-green px-6 text-center shadow-[0_16px_36px_rgba(47,58,38,0.32)]"
          style={{
            left: "50%",
            bottom: "6%",
            width: "78%",
            height: "22%",
            borderRadius: "48% 52% 44% 56% / 62% 48% 52% 38%",
            transform: "translateX(-48%) rotate(3deg)",
          }}
        >
          <p
            className="font-sans font-medium text-cream"
            style={{
              fontSize: "clamp(13px, 1.45cqw, 16px)",
              lineHeight: 1.3,
              letterSpacing: "0.01em",
              transform: "rotate(-3deg)",
            }}
          >
            {t.philosophy.note.split("\n").map((line, i, arr) => (
              <span key={line}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Philosophy() {
  const t = useT();
  const p = t.philosophy;

  return (
    <section
      id="mission"
      data-theme="light"
      className="relative w-full bg-page"
      style={{ scrollMarginTop: "5rem" }}
      aria-labelledby="philosophy-title"
    >
      <div className="stage px-[clamp(16px,calc(var(--u)*8.5),96px)] py-[clamp(40px,calc(var(--u)*6),72px)]">
        <div className="hidden min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:items-center min-[900px]:gap-x-10">
          <div className="reveal max-w-[420px]">
            <h2
              id="philosophy-title"
              className="font-sans font-medium text-ink-green"
              style={{
                fontSize: "clamp(26px, calc(var(--u) * 3.6), 44px)",
                lineHeight: 1.15,
                marginBottom: "1.25em",
              }}
            >
              {p.titleLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < p.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div
              className="space-y-3 text-ink"
              style={{
                fontSize: "clamp(13px, calc(var(--u) * 1.45), 16px)",
                lineHeight: 1.5,
              }}
            >
              <p>{p.p1}</p>
              <p>{p.p2}</p>
            </div>
            <Link
              to="/a-propos"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-ink-green font-sans font-medium text-white transition-opacity hover:opacity-90"
              style={{
                width: "clamp(160px, calc(var(--u) * 18.9), 240px)",
                height: "clamp(42px, calc(var(--u) * 3.7), 48px)",
                fontSize: "clamp(12px, calc(var(--u) * 1.35), 14px)",
              }}
            >
              {p.cta}
            </Link>
          </div>

          <div className="reveal">
            <MissionFeature className="w-[min(100%,420px)]" />
          </div>
        </div>

        <div className="flex flex-col gap-8 min-[900px]:hidden">
          <h2
            className="reveal font-sans font-medium text-ink-green"
            style={{ fontSize: "clamp(28px, 7vw, 40px)", lineHeight: 1.15 }}
          >
            {p.title}
          </h2>
          <div className="reveal space-y-3 text-[15px] leading-[1.5] text-ink">
            <p>{p.p1}</p>
            <p>{p.p2}</p>
          </div>
          <Link
            to="/a-propos"
            className="reveal inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-sage px-8 font-medium text-white"
          >
            {p.cta}
          </Link>
          <div className="reveal">
            <MissionFeature className="w-[80vw] max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
