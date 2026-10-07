import { useEffect } from "react";
import { Link } from "react-router-dom";
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
    const el = document.getElementById(hash.replace("#", ""));
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
  }, [hash]);

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="container-x max-w-3xl py-14">
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-ink">{page.h2}</h2>
        <p className="mt-5 leading-relaxed text-muted">{page.p1}</p>
        <p className="mt-4 leading-relaxed text-muted">{page.p2}</p>
        <Link to="/don" className="btn-mustard mt-8">
          Faire un don
        </Link>
      </section>

      <section id="objectifs" className="bg-soft py-14">
        <div className="container-x">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-ink">
            {objectives.title}
          </h2>
          <div className="mt-8 grid gap-6 min-[700px]:grid-cols-2">
            {objectives.items.map((item, i) => (
              <div key={item.title} className="rounded-3xl bg-card p-6 shadow-card">
                <p className="text-2xl font-extrabold text-mustard">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
