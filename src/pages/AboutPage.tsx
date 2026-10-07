import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useT } from "../i18n/LocaleContext";

export default function AboutPage() {
  const page = useT().pages.about;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="container-x grid gap-12 py-14 min-[900px]:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-ink">{page.h2}</h2>
          <p className="mt-5 leading-relaxed text-muted">{page.p1}</p>
          <p className="mt-4 leading-relaxed text-muted">{page.p2}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/don" className="btn-mustard">
              {page.linkDonate}
            </Link>
            <Link to="/missions" className="btn-forest">
              {page.linkMissions}
            </Link>
            <Link to="/contact" className="inline-flex items-center px-2 font-semibold text-forest underline">
              {page.linkContact}
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img src="/images/about_side.jpg" alt="" className="aspect-[4/5] h-full w-full object-cover" />
        </div>
      </section>
    </>
  );
}
