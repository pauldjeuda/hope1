import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Instagram, Linkedin, Menu, Twitter, X, ArrowRight } from "lucide-react";
import { NAV } from "../content/charity";
import Logo from "./Logo";
import { useNavChrome } from "../hooks/useNavChrome";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { glass, tone } = useNavChrome(72);
  const onDark = tone === "dark";
  const ink = onDark ? "text-cream" : "text-forest";
  const muted = onDark ? "text-cream/75 hover:text-cream" : "text-muted hover:text-forest";
  const active = onDark ? "text-cream" : "text-forest";

  // Morph : crème sur fond clair, forêt légère sur fond sombre
  const glassBg = onDark
    ? `rgba(47, 56, 36, ${0.28 + glass * 0.55})`
    : `rgba(243, 241, 236, ${glass})`;
  const borderAlpha = onDark ? 0.12 + glass * 0.1 : 0.06 + glass * 0.1;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-out"
      style={{
        backgroundColor: open ? "var(--page)" : glassBg,
        backdropFilter: open ? "none" : "blur(18px) saturate(1.25)",
        WebkitBackdropFilter: open ? "none" : "blur(18px) saturate(1.25)",
        borderBottom: open
          ? "1px solid rgba(63, 74, 46, 0.08)"
          : `1px solid rgba(63, 74, 46, ${borderAlpha})`,
        boxShadow:
          !open && glass > 0.55
            ? `0 8px 28px rgba(47, 56, 36, ${0.06 + (glass - 0.55) * 0.12})`
            : "none",
      }}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
          aria-label="HOPE Bridge for the Needy — Accueil"
        >
          <Logo
            part="full"
            tone={open ? "light" : tone}
            className="h-11 w-auto max-w-[168px] min-[480px]:h-12 min-[480px]:max-w-[200px]"
          />
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Navigation principale"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-[0.92rem] font-medium transition-colors duration-300 ${
                  isActive ? active : muted
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div
            className={`flex items-center gap-2 transition-colors duration-300 ${
              onDark ? "text-cream/80" : "text-forest/70"
            }`}
          >
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="transition hover:opacity-100 opacity-80"
            >
              <Twitter className="h-4 w-4" strokeWidth={1.6} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:opacity-100 opacity-80"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.6} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition hover:opacity-100 opacity-80"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </div>
          <Link to="/don" className="btn-mustard">
            Faire un don
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center transition-colors duration-300 lg:hidden ${
            open ? "text-forest" : ink
          }`}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-forest/10 bg-page px-4 py-4 shadow-card lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-medium text-forest hover:bg-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/don"
              onClick={() => setOpen(false)}
              className="btn-mustard mt-2 w-full"
            >
              Faire un don
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
