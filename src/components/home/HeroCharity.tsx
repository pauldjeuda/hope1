import { Link } from "react-router-dom";
import { HERO } from "../../content/charity";
import AfricaMedia from "./AfricaMedia";

export default function HeroCharity() {
  return (
    <section className="torn-bottom relative overflow-hidden bg-sage-bg">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "url(/images/hero_bg-1600.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 28%",
          filter: "grayscale(0.35)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(201,214,184,0.94) 0%, rgba(201,214,184,0.78) 45%, rgba(201,214,184,0.35) 100%)",
        }}
        aria-hidden
      />

      <div className="container-x relative grid items-center gap-8 py-12 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-6 min-[900px]:py-16">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-[clamp(2.35rem,5.2vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-forest">
            {HERO.titleBefore}{" "}
            <span className="highlight-word">{HERO.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-forest/80">
            {HERO.text}
          </p>
          <Link to="/don" className="btn-forest mt-8">
            {HERO.cta}
          </Link>
        </div>

        <AfricaMedia badge={HERO.badge} badgeSub={HERO.badgeSub} />
      </div>
    </section>
  );
}
