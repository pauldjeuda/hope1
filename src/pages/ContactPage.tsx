import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import { CONTACT } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

export default function ContactPage() {
  const t = useT();
  const page = t.pages.contact;

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
        <div className="stage grid gap-12 min-[800px]:grid-cols-2">
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
            <div className="mt-8 rounded-2xl border border-ink-green/10 bg-white/40 px-5 py-5">
              <p className="font-sans text-ink-green" style={{ fontSize: "15px" }}>
                {page.donateHint}
              </p>
              <Link
                to="/don"
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-orange)] px-6 font-sans font-medium text-white"
                style={{ fontSize: "14px" }}
              >
                {page.donateCta}
              </Link>
            </div>
          </div>
          <div className="space-y-6 font-sans">
            <div>
              <p className="text-sm uppercase tracking-[0.12em] text-ink-green opacity-60">
                {page.emailLabel}
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 inline-flex items-center gap-2 text-ink-green underline decoration-sage/50 underline-offset-4"
                style={{ fontSize: "clamp(15px, 1.5vw, 17px)" }}
              >
                <Mail strokeWidth={1.4} className="h-4 w-4" />
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.12em] text-ink-green opacity-60">
                {page.locationLabel}
              </p>
              <p
                className="mt-2 flex gap-2 text-ink opacity-85"
                style={{ fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.55 }}
              >
                <MapPin strokeWidth={1.4} className="mt-1 h-4 w-4 shrink-0 opacity-70" />
                <span>
                  <span className="block font-medium text-ink-green">{CONTACT.city}</span>
                  {CONTACT.address}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
