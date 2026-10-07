import { Link } from "react-router-dom";
import { BANNER } from "../../content/charity";

export default function FoodBanner() {
  return (
    <section className="bg-page py-14 min-[900px]:py-16">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[2rem] bg-cream shadow-card min-[800px]:grid-cols-2">
          <div className="relative min-h-[220px]">
            <img
              src="/images/about_side.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-10 min-[700px]:px-10">
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-ink">
              {BANNER.title}
            </h2>
            <p className="mt-3 text-muted">{BANNER.text}</p>
            <Link to="/don" className="btn-forest mt-6 w-fit">
              {BANNER.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
