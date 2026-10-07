import { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import Programs from "../components/Programs";
import DonateBanner from "../components/DonateBanner";
import Engage from "../components/Engage";

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = root.querySelectorAll<HTMLElement>(".reveal");
    if (reduced) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return ref;
}

export default function HomePage() {
  const mainRef = useReveal();

  return (
    <main ref={mainRef} id="main" className="relative bg-page">
      <Hero />
      <Philosophy />
      <Programs />
      <DonateBanner />
      <Engage />
    </main>
  );
}
