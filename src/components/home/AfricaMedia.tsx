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
    <div className="relative mx-auto w-full max-w-[min(460px,100%)] px-1 pb-2 min-[480px]:px-0 min-[480px]:pb-0">
      {/* Ratio = silhouette Afrique solide (860×1000) */}
      <div className="relative aspect-[860/1000] w-full">
        {/* Relief / ombre sous le continent */}
        <div
          className="africa-mask pointer-events-none absolute inset-[1.5%] translate-y-[6px] bg-forest/35 blur-[2px]"
          aria-hidden
        />

        <div className="africa-mask absolute inset-0 overflow-hidden bg-forest/15">
          {mode === "video" ? (
            <video
              ref={videoRef}
              className="h-full w-full scale-[1.2] object-cover object-[48%_22%]"
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
              className="africa-kenburns h-full w-full scale-[1.16] object-cover object-[48%_22%]"
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-[6%] right-[2%] z-10 flex h-[6.25rem] w-[6.25rem] flex-col items-center justify-center rounded-full bg-mustard text-center shadow-[0_12px_32px_rgba(63,74,46,0.3)] min-[480px]:bottom-[8%] min-[480px]:right-[0%] min-[480px]:h-[7.5rem] min-[480px]:w-[7.5rem] min-[700px]:right-[-4%] min-[700px]:h-[8.25rem] min-[700px]:w-[8.25rem]">
        <span className="px-1.5 text-[11px] font-extrabold leading-tight text-forest-deep min-[480px]:px-2 min-[480px]:text-[13px] min-[700px]:text-sm">
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
