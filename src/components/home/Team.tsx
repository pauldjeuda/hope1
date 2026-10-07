import { PARTNERS, TEAM } from "../../content/charity";

export default function Team() {
  return (
    <section className="relative overflow-hidden bg-page pt-8">
      <div className="container-x relative z-10">
        <h2 className="mb-10 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold text-ink">
          {TEAM.title}
        </h2>
        <div className="grid grid-cols-2 gap-5 min-[800px]:grid-cols-4">
          {TEAM.members.map((m) => (
            <div key={m.name} className="text-center">
              <div className="mx-auto aspect-square max-w-[200px] overflow-hidden rounded-3xl bg-soft shadow-card">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <p className="mt-3 font-bold text-ink">{m.name}</p>
              <p className="text-sm text-muted">{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-forest py-10" data-nav-tone="dark">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((p) => (
            <span
              key={p}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/55"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
