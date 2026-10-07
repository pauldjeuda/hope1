import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Instagram, Linkedin, Menu, Twitter, X, ArrowRight } from "lucide-react";
import { NAV, SITE } from "../content/charity";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${open ? "bg-page shadow-sm" : ""}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        {/* Zone adaptive : le texte s’inverse selon l’arrière-plan (style Shu Anta) */}
        <div
          className={`flex min-w-0 flex-1 items-center justify-between gap-4 ${
            open ? "" : "mix-blend-difference"
          }`}
        >
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Logo
              part="mark"
              className={`h-10 w-10 ${open ? "" : "brightness-0 invert"}`}
            />
            <span
              className={`text-[1.15rem] font-bold lowercase tracking-tight ${
                open ? "text-forest" : "text-white"
              }`}
            >
              {SITE.brandShort}
            </span>
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
                  `text-[0.92rem] font-medium text-white transition ${
                    isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 text-white lg:flex">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="opacity-80 transition hover:opacity-100"
            >
              <Twitter className="h-4 w-4" strokeWidth={1.6} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="opacity-80 transition hover:opacity-100"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.6} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="opacity-80 transition hover:opacity-100"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </div>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center lg:hidden ${
              open ? "text-forest" : "text-white"
            }`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* CTA hors blend : garde la couleur mustard */}
        <Link to="/don" className="btn-mustard relative z-10 hidden shrink-0 lg:inline-flex">
          Faire un don
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
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
