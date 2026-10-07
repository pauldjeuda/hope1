type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
};

export default function PageHero({ eyebrow, title, lead }: Props) {
  return (
    <section className="torn-bottom bg-sage-bg">
      <div className="container-x py-14 min-[800px]:py-16">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-forest/70">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-forest">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-forest/80">{lead}</p>}
      </div>
    </section>
  );
}
