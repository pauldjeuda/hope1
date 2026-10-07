import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import Logo from "./Logo";
import FitText from "./FitText";
import FooterWaves from "./FooterWaves";
import { BRAND, CONTACT } from "../content/landing";
import { useT } from "../i18n/LocaleContext";

function FooterLink({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} style={style}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useT();
  const f = t.footer;

  return (
    <div className="relative w-full">
      <FooterWaves />

      <footer
        className="relative w-full overflow-x-hidden bg-footer text-cream"
        data-theme="dark"
      >
        <div
          className="stage"
          style={{
            paddingTop: "clamp(28px, calc(var(--u) * 5), 56px)",
            paddingInline: "clamp(16px, calc(var(--u) * 8.5), 96px)",
            paddingBottom: 0,
          }}
        >
          <div className="grid grid-cols-1 gap-10 min-[480px]:grid-cols-2 min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div className="min-w-0">
              <div className="mb-4">
                <Logo
                  part="full"
                  theme="dark"
                  className="h-auto w-[min(100%,200px)] brightness-110"
                />
              </div>
              <p
                className="mb-2 max-w-sm font-sans"
                style={{
                  fontSize: "clamp(13px, calc(var(--u) * 1.4), 15px)",
                  lineHeight: 1.45,
                  opacity: 0.9,
                }}
              >
                {f.tagline}
              </p>
              <p
                className="mb-5 max-w-sm font-sans"
                style={{
                  fontSize: "clamp(12px, calc(var(--u) * 1.25), 14px)",
                  lineHeight: 1.45,
                  opacity: 0.72,
                }}
              >
                {f.about}
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.35), 14px)" }}
              >
                <Mail strokeWidth={1.4} className="h-4 w-4 shrink-0" />
                {CONTACT.email}
              </a>
            </div>

            <div className="min-w-0">
              <h3
                className="mb-3 font-sans font-medium"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.5), 15px)", opacity: 0.6 }}
              >
                {f.programsTitle}
              </h3>
              <ul className="space-y-2">
                {f.programs.map((l) => (
                  <li key={l.label}>
                    <FooterLink
                      href={l.href}
                      className="font-sans opacity-[0.88] transition hover:underline hover:opacity-100"
                      style={{ fontSize: "clamp(13px, calc(var(--u) * 1.35), 14px)" }}
                    >
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h3
                className="mb-3 font-sans font-medium"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.5), 15px)", opacity: 0.6 }}
              >
                {f.orgTitle}
              </h3>
              <ul className="space-y-2">
                {f.org.map((l) => (
                  <li key={l.label}>
                    <FooterLink
                      href={l.href}
                      className="font-sans opacity-[0.88] transition hover:underline hover:opacity-100"
                      style={{ fontSize: "clamp(13px, calc(var(--u) * 1.35), 14px)" }}
                    >
                      {l.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h3
                className="mb-3 font-sans font-medium"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.5), 15px)", opacity: 0.6 }}
              >
                {f.findUs}
              </h3>
              <ul
                className="space-y-3 font-sans"
                style={{ fontSize: "clamp(13px, calc(var(--u) * 1.3), 14px)" }}
              >
                <li className="flex gap-2.5 opacity-90">
                  <MapPin strokeWidth={1.4} className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                  <span>
                    <span className="block font-medium opacity-100">{f.contact.city}</span>
                    <span className="mt-0.5 block opacity-75">{f.contact.address}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-[clamp(28px,calc(var(--u)*5),56px)] flex flex-col gap-3 border-t border-[rgba(244,240,232,0.18)] pt-5 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between"
            style={{ fontSize: "clamp(12px, calc(var(--u) * 1.2), 13px)", opacity: 0.6 }}
          >
            <p>{f.rights.replace("{year}", String(year))}</p>
            <p>
              {f.legal.map((l, i) => (
                <span key={l.label}>
                  {i > 0 && " · "}
                  <FooterLink href={l.href} className="hover:underline hover:opacity-100">
                    {l.label}
                  </FooterLink>
                </span>
              ))}
            </p>
          </div>

          <div
            className="relative mx-auto max-w-full overflow-hidden"
            style={{
              marginTop: "clamp(20px, 2.5vw, 36px)",
              paddingBottom: "0.7cm",
            }}
            aria-hidden
          >
            <div className="pointer-events-none select-none text-sage" style={{ opacity: 0.38 }}>
              <FitText text={BRAND} targetCqw={92} className="text-sage" wide={false} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
