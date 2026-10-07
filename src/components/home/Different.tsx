import { HandHeart, HeartHandshake, Shield } from "lucide-react";
import { DIFFERENT } from "../../content/charity";

const ICONS = {
  heart: HeartHandshake,
  users: HandHeart,
  shield: Shield,
} as const;

export default function Different() {
  return (
    <section className="bg-page py-16 min-[900px]:py-20">
      <div className="container-x">
        <h2 className="mb-12 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold text-ink">
          {DIFFERENT.title}
        </h2>
        <div className="grid gap-10 min-[800px]:grid-cols-3">
          {DIFFERENT.items.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            return (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-bg/70 text-forest">
                  <Icon className="h-8 w-8" strokeWidth={1.4} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
