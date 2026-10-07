import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function MissionsPage() {
  const t = useT();
  const page = t.pages.missions;
  const objectives = t.objectives;
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [hash]);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image="/images/hero_missions.jpg"
        tone="photo"
      />
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBlock: "clamp(40px, 6vw, 72px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage max-w-3xl">
          <h2
            className="font-display text-ink-green"
            style={{ fontSize: "clamp(28px, 3.2vw, 40px)", lineHeight: 1.15 }}
          >
            {page.h2}
          </h2>
          <p
            className="mt-5 font-sans text-ink opacity-85"
            style={{ fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.6 }}
          >
            {page.p1}
          </p>
          <p
            className="mt-4 font-sans text-ink opacity-85"
            style={{ fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.6 }}
          >
            {page.p2}
          </p>
        </div>
      </section>

      <section
        id="objectifs"
        data-theme="light"
        className="bg-page"
        style={{
          scrollMarginTop: "5rem",
          paddingBottom: "clamp(48px, 8vw, 96px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage">
          <h2
            className="font-sans font-medium text-ink-green"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}
          >
            {objectives.title}
          </h2>
          <div className="mt-10 grid gap-8 min-[700px]:grid-cols-2">
            {objectives.items.map((item, i) => (
              <div key={item.title} className="border-t border-[rgba(47,58,38,0.15)] pt-5">
                <p
                  className="font-display text-sage"
                  style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="mt-3 font-sans font-medium text-ink-green"
                  style={{ fontSize: "clamp(16px, 1.6vw, 18px)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 font-sans text-ink opacity-80"
                  style={{ fontSize: "clamp(13px, 1.3vw, 15px)", lineHeight: 1.55 }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
