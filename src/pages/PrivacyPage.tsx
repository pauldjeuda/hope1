import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function PrivacyPage() {
  const page = useT().pages.privacy;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} tone="light" />
      <section
        data-theme="light"
        className="bg-page"
        style={{
          paddingBottom: "clamp(48px, 8vw, 96px)",
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
        }}
      >
        <div className="stage max-w-3xl space-y-10">
          {page.sections.map((s) => (
            <div key={s.title}>
              <h2
                className="font-sans font-medium text-ink-green"
                style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
              >
                {s.title}
              </h2>
              <p
                className="mt-3 font-sans text-ink opacity-85"
                style={{ fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.6 }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
