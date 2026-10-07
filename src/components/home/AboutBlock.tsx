import { Link } from "react-router-dom";
import { ABOUT } from "../../content/charity";

export default function AboutBlock() {
  return (
    <section className="bg-page pb-16 min-[900px]:pb-24">
      <div className="container-x grid items-center gap-12 min-[900px]:grid-cols-2">
        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            <img
              src="/images/care_a-1200.jpg"
              alt=""
              className="aspect-[4/5] w-full rounded-3xl object-cover"
            />
            <div className="flex flex-col gap-3">
              <img
                src="/images/care_b-1200.jpg"
                alt=""
                className="aspect-square w-full rounded-3xl object-cover"
              />
              <img
                src="/images/care_c-1200.jpg"
                alt=""
                className="aspect-[5/4] w-full rounded-3xl object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-forest text-center text-cream shadow-card min-[600px]:h-32 min-[600px]:w-32">
            <span className="text-2xl font-extrabold text-mustard">{ABOUT.stat}</span>
            <span className="mt-1 px-3 text-[10px] font-semibold leading-tight">
              {ABOUT.statLabel}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-tight text-ink">
            {ABOUT.title}
          </h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">{ABOUT.p1}</p>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{ABOUT.p2}</p>
          <Link to="/a-propos" className="btn-forest mt-8">
            {ABOUT.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
