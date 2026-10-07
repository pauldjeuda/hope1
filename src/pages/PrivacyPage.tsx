import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function PrivacyPage() {
  const page = useT().pages.privacy;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="container-x max-w-3xl space-y-8 py-14">
        {page.sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-lg font-bold text-ink">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
