import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type NavTone = "light" | "dark";

/**
 * Fond morph (opacité) + ton clair/sombre sous la barre.
 * - glass : 0→1 selon le scroll (lisibilité)
 * - tone : "light" = fond clair → texte foncé ; "dark" = fond sombre → texte clair
 */
export function useNavChrome(navHeight = 72) {
  const { pathname } = useLocation();
  const [glass, setGlass] = useState(0.42);
  const [tone, setTone] = useState<NavTone>("light");

  useEffect(() => {
    let raf = 0;

    const updateGlass = () => {
      const y = window.scrollY;
      const t = Math.min(1, y / 140);
      // Top : plus léger ; en scroll : plus opaque pour la lisibilité
      setGlass(0.38 + t * 0.54);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateGlass);
    };

    updateGlass();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateGlass, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateGlass);
    };
  }, [pathname]);

  useEffect(() => {
    let raf = 0;

    const sampleTone = () => {
      const y = Math.max(8, Math.floor(navHeight * 0.55));
      const xs = [0.12, 0.5, 0.88].map((p) => Math.floor(window.innerWidth * p));
      let darkHits = 0;
      let samples = 0;

      for (const x of xs) {
        const stack = document.elementsFromPoint(x, y);
        for (const el of stack) {
          if (!(el instanceof HTMLElement)) continue;
          if (el.closest("header")) continue;

          const explicit = el.closest("[data-nav-tone]") as HTMLElement | null;
          if (explicit) {
            samples += 1;
            if (explicit.dataset.navTone === "dark") darkHits += 1;
            break;
          }

          const bg = getEffectiveBackground(el);
          if (!bg) continue;
          samples += 1;
          if (relativeLuminance(bg) < 0.45) darkHits += 1;
          break;
        }
      }

      if (samples === 0) {
        setTone("light");
        return;
      }
      setTone(darkHits >= Math.ceil(samples / 2) ? "dark" : "light");
    };

    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sampleTone);
    };

    sampleTone();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    const id = window.setInterval(sampleTone, 600);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [pathname, navHeight]);

  // Quand le morph est bien opaque, forcer le ton clair (texte forest)
  const effectiveTone: NavTone = glass >= 0.78 ? "light" : tone;

  return { glass, tone: effectiveTone };
}

function parseCssColor(input: string): { r: number; g: number; b: number; a: number } | null {
  const c = input.trim().toLowerCase();
  if (!c || c === "transparent" || c === "rgba(0, 0, 0, 0)") return null;

  if (c.startsWith("#")) {
    const hex = c.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return { r, g, b, a: 1 };
    }
    if (hex.length >= 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: 1,
      };
    }
  }

  const m = c.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (m) {
    return {
      r: Number(m[1]),
      g: Number(m[2]),
      b: Number(m[3]),
      a: m[4] === undefined ? 1 : Number(m[4]),
    };
  }
  return null;
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const lin = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function getEffectiveBackground(start: HTMLElement): { r: number; g: number; b: number } | null {
  let el: HTMLElement | null = start;
  while (el && el !== document.documentElement) {
    const style = getComputedStyle(el);
    const parsed = parseCssColor(style.backgroundColor);
    if (parsed && parsed.a > 0.15) {
      return { r: parsed.r, g: parsed.g, b: parsed.b };
    }
    el = el.parentElement;
  }
  const body = parseCssColor(getComputedStyle(document.body).backgroundColor);
  if (body && body.a > 0.15) return { r: body.r, g: body.g, b: body.b };
  return { r: 243, g: 241, b: 236 }; // --page
}
