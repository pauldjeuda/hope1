import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Twitter,
} from "lucide-react";
import { FOOTER, SITE } from "../content/charity";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="torn-footer-top relative z-10 bg-forest text-cream" data-theme="dark">
      <div className="container-x grid gap-10 pb-10 pt-16 min-[800px]:grid-cols-2 min-[1100px]:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Logo part="mark" className="h-11 w-11" />
            <span className="text-xl font-bold lowercase tracking-tight">{SITE.brandShort}</span>
          </div>
          <p className="mb-2 text-xs text-cream/55">
            {FOOTER.rights.replace("{year}", String(year))}
          </p>
          <p className="mb-5 max-w-xs text-sm leading-relaxed text-cream/75">{FOOTER.tagline}</p>
          <div className="flex gap-2">
            {[
              { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-mustard hover:text-forest"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-mustard">
            Liens rapides
          </h3>
          <ul className="space-y-2.5 text-sm text-cream/85">
            {FOOTER.quick.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className="transition hover:text-mustard">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-mustard">Contact</h3>
          <ul className="space-y-3 text-sm text-cream/85">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mustard" />
              {FOOTER.contact.address}
            </li>
            <li>
              <a
                href={`mailto:${FOOTER.contact.email}`}
                className="flex gap-2 transition hover:text-mustard"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mustard" />
                {FOOTER.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-mustard">
            {FOOTER.newsletter}
          </h3>
          <form
            className="flex overflow-hidden rounded-full bg-forest-deep ring-1 ring-white/15"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Votre e-mail"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/45"
            />
            <button type="submit" className="bg-mustard px-4 text-forest" aria-label="Envoyer">
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-cream/45">Nous ne partageons jamais vos coordonnées.</p>
        </div>
      </div>
    </footer>
  );
}
