import { Link } from "react-router-dom";
import { useT } from "../i18n/LocaleContext";

const IMAGES = [
  "/images/care_a-1200.jpg",
  "/images/care_b-1200.jpg",
  "/images/care_c-1200.jpg",
  "/images/allinone_a-1600.jpg",
];

export default function Programs() {
  const t = useT();
  const p = t.programs;

  return (
    <section
      id="actions"
      data-theme="light"
      className="relative w-full bg-page"
      style={{ scrollMarginTop: "5rem" }}
      aria-labelledby="programs-title"
    >
      <div
        className="stage"
        style={{
          paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
          paddingBlock: "clamp(40px, calc(var(--u) * 6), 72px)",
        }}
      >
        <div className="reveal mb-10 max-w-xl">
          <h2
            id="programs-title"
            className="font-sans font-medium text-ink-green"
            style={{
              fontSize: "clamp(26px, calc(var(--u) * 3.4), 40px)",
              lineHeight: 1.15,
            }}
          >
            {p.title}
          </h2>
          <p
            className="mt-3 font-sans text-ink opacity-80"
            style={{ fontSize: "clamp(14px, calc(var(--u) * 1.4), 16px)", lineHeight: 1.5 }}
          >
            {p.lead}
          </p>
        </div>

        <div className="grid gap-5 min-[700px]:grid-cols-2">
          {p.items.map((item, i) => (
            <Link
              key={item.id}
              to={item.href}
              className="reveal group relative block overflow-hidden"
              style={{ minHeight: "clamp(200px, 28vw, 260px)" }}
            >
              <img
                src={IMAGES[i % IMAGES.length]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(36,50,74,0.15) 0%, rgba(36,50,74,0.78) 100%)",
                }}
              />
              <div className="relative flex h-full flex-col justify-end p-6 text-cream">
                <p
                  className="font-display opacity-70"
                  style={{ fontSize: "28px", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="mt-2 font-sans font-medium"
                  style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-1.5 max-w-sm opacity-90"
                  style={{ fontSize: "13px", lineHeight: 1.45 }}
                >
                  {item.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
