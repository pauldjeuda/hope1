type LogoProps = {
  part?: "full" | "mark";
  className?: string;
  /** Fond derrière le logo : light = couleur, dark = variante blanche */
  tone?: "light" | "dark";
};

export default function Logo({
  part = "full",
  className = "",
  tone = "light",
}: LogoProps) {
  const src =
    part === "mark"
      ? tone === "dark"
        ? "/brand/logo-mark-white.png"
        : "/brand/logo-mark.png"
      : tone === "dark"
        ? "/brand/logo-white.png"
        : "/brand/logo-full.png";

  return (
    <img
      src={src}
      alt="HOPE Bridge for the Needy"
      className={`object-contain ${className}`}
      width={part === "mark" ? 64 : 200}
      height={part === "mark" ? 64 : 110}
    />
  );
}
