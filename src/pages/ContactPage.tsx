import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import { CONTACT } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

export default function ContactPage() {
  const page = useT().pages.contact;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="container-x grid gap-12 py-14 min-[800px]:grid-cols-2">
        <div>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-ink">{page.h2}</h2>
          <p className="mt-5 leading-relaxed text-muted">{page.p1}</p>
          <div className="mt-8 rounded-3xl bg-sage-bg/60 p-6">
            <p className="font-semibold text-forest">{page.donateHint}</p>
            <Link to="/don" className="btn-mustard mt-4">
              {page.donateCta}
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">{page.emailLabel}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-2 inline-flex items-center gap-2 font-semibold text-forest"
            >
              <Mail className="h-4 w-4" />
              {CONTACT.email}
            </a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              {page.locationLabel}
            </p>
            <p className="mt-2 flex gap-2 text-muted">
              <MapPin className="mt-1 h-4 w-4 shrink-0" />
              <span>
                <span className="block font-semibold text-ink">{CONTACT.city}</span>
                {CONTACT.address}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
