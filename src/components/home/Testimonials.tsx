import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIAL } from "../../content/charity";

export default function Testimonials() {
  return (
    <section className="torn-bottom torn-bottom-forest bg-page pb-16 pt-6">
      <div className="container-x pb-8">
        <div className="mb-8 flex flex-col gap-4 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold text-ink">
            {TESTIMONIAL.title}
          </h2>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-forest"
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-forest"
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid items-stretch gap-6 min-[900px]:grid-cols-2">
          <div className="flex flex-col justify-center rounded-3xl bg-sage-bg p-8 min-[700px]:p-10">
            <div className="mb-4 flex gap-1 text-mustard">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="text-lg font-medium leading-relaxed text-forest">
              “{TESTIMONIAL.quote}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="/images/care_a-640.jpg"
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-ink">{TESTIMONIAL.name}</p>
                <p className="text-sm text-muted">{TESTIMONIAL.role}</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/images/allinone_b-1600.jpg"
              alt=""
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
