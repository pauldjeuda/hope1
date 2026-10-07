import { NEWS } from "../../content/charity";

export default function News() {
  return (
    <section className="bg-page py-16 min-[900px]:py-20">
      <div className="container-x">
        <h2 className="mb-10 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold text-ink">
          {NEWS.title}
        </h2>
        <div className="grid gap-6 min-[800px]:grid-cols-3">
          {NEWS.items.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl bg-card shadow-card"
            >
              <div className="relative">
                <img src={item.image} alt="" className="aspect-[16/11] w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-forest px-3 py-1 text-xs font-bold text-cream">
                  {item.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                  <span className="font-semibold text-forest">{item.author}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-bold leading-snug text-ink">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
