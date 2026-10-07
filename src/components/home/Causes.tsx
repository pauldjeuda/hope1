import { Link } from "react-router-dom";
import { CAUSES } from "../../content/charity";

export default function Causes() {
  return (
    <section className="torn-bottom torn-bottom-soft bg-soft py-16 min-[900px]:py-20">
      <div className="container-x">
        <h2 className="mb-10 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold text-ink">
          {CAUSES.title}
        </h2>

        <div className="mb-6 grid overflow-hidden rounded-3xl bg-card shadow-card min-[900px]:grid-cols-2">
          <img
            src="/images/allinone_a-1600.jpg"
            alt=""
            className="h-full min-h-[240px] w-full object-cover"
          />
          <div className="flex flex-col justify-center p-6 min-[700px]:p-8">
            <h3 className="text-xl font-bold text-ink">{CAUSES.featured.title}</h3>
            <div className="progress-track mt-5">
              <div className="progress-fill" style={{ width: `${CAUSES.featured.percent}%` }} />
            </div>
            <div className="mt-3 flex justify-between text-sm text-muted">
              <span>
                Collecté : <strong className="text-forest">{CAUSES.featured.raised} FCFA</strong>
              </span>
              <span>
                Objectif : <strong className="text-ink">{CAUSES.featured.goal} FCFA</strong>
              </span>
            </div>
            <Link to="/don" className="btn-forest mt-6 w-fit">
              {CAUSES.featured.cta}
            </Link>
          </div>
        </div>

        <div className="grid gap-5 min-[800px]:grid-cols-3">
          {CAUSES.items.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-3xl bg-card shadow-card">
              <img src={item.image} alt="" className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <h3 className="min-h-[3.2rem] text-base font-bold leading-snug text-ink">
                  {item.title}
                </h3>
                <div className="progress-track mt-4">
                  <div className="progress-fill" style={{ width: `${item.percent}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>{item.raised} FCFA</span>
                  <span>{item.goal} FCFA</span>
                </div>
                <Link to="/don" className="btn-forest mt-4 w-full text-sm">
                  Faire un don
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
