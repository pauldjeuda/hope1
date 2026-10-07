import { useEffect, useRef, useState } from "react";

/**
 * Cadre continent Afrique (masque SVG géographique) + média hero.
 * Priorité : /videos/hero-hope.mp4 si présent, sinon image animée (Ken Burns).
 */
export default function AfricaMedia({
  poster = "/images/hero_bg-1600.jpg",
  badge,
  badgeSub,
}: {
  poster?: string;
  badge: string;
  badgeSub: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"check" | "video" | "image">("check");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/videos/hero-hope.mp4", { method: "HEAD" });
        if (!cancelled && res.ok) {
          setMode("video");
          return;
        }
      } catch {
        /* ignore */
      }
      if (!cancelled) setMode("image");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (mode !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setMode("image"));
  }, [mode]);

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* Ratio = masque Afrique recadré (~868×1000) */}
      <div className="relative aspect-[868/1000] w-full">
        {/* Relief / ombre sous le continent */}
        <div
          className="africa-mask pointer-events-none absolute inset-[2%] translate-y-2 bg-forest/30 blur-[1.5px]"
          aria-hidden
        />

        <div className="africa-mask absolute inset-0 overflow-hidden bg-forest/10">
          {mode === "video" ? (
            <video
              ref={videoRef}
              className="h-full w-full scale-[1.18] object-cover object-[48%_22%]"
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              onError={() => setMode("image")}
            >
              <source src="/videos/hero-hope.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src={poster}
              alt="HOPE Bridge — action sur le continent africain"
              className="africa-kenburns h-full w-full scale-[1.14] object-cover object-[48%_22%]"
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-[8%] right-[-2%] z-10 flex h-[7.5rem] w-[7.5rem] flex-col items-center justify-center rounded-full bg-mustard text-center shadow-[0_12px_32px_rgba(63,74,46,0.3)] min-[480px]:right-[-6%] min-[480px]:h-[8.25rem] min-[480px]:w-[8.25rem]">
        <span className="px-2 text-[13px] font-extrabold leading-tight text-forest-deep min-[480px]:text-sm">
          {badge}
        </span>
        <span className="mt-1 px-3 text-[9px] font-bold uppercase tracking-wide text-forest/75">
          {badgeSub}
        </span>
      </div>

      <div className="absolute -left-1 top-[38%] z-10 hidden h-24 w-24 overflow-hidden rounded-[40%_60%_48%_52%] border-[5px] border-page shadow-card min-[700px]:block">
        <img src="/images/care_b-640.jpg" alt="" className="h-full w-full object-cover" />
      </div>
      <span
        className="pointer-events-none absolute right-[10%] top-[20%] z-10 hidden h-10 w-16 -rotate-[18deg] rounded-full bg-mustard min-[700px]:block"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-[28%] left-[4%] z-10 hidden h-8 w-14 rotate-12 rounded-full bg-sage-mid min-[700px]:block"
        aria-hidden
      />
    </div>
  );
}
