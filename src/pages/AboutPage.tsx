import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function AboutPage() {
  const t = useT();
  const page = t.pages.about;

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image="/images/hero_a_propos.jpg"
        tone="photo"
      />
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBlock: "clamp(40px, 6vw, 80px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage grid gap-12 min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:items-start">
          <div>
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
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/don"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-orange)] px-6 font-sans font-medium text-white"
              >
                {page.linkDonate}
              </Link>
              <Link
                to="/missions"
                className="font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
              >
                {page.linkMissions}
              </Link>
              <Link
                to="/contact"
                className="font-sans text-ink-green underline decoration-sage/60 underline-offset-4"
              >
                {page.linkContact}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="/images/about_side.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
