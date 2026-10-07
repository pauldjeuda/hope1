type LogoProps = {
  part?: "full" | "mark";
  className?: string;
  /** Fond derrière le logo : light = logo foncé/couleur, dark = logo cream */
  tone?: "light" | "dark";
};

export default function Logo({
  part = "mark",
  className = "",
  tone = "light",
}: LogoProps) {
  if (part === "full") {
    return (
      <img
        src="/brand/logo-full.png"
        alt="HOPE Bridge for the Needy"
        className={`object-contain ${className}`}
        width={200}
        height={110}
      />
    );
  }

  const src =
    tone === "dark" ? "/brand/logo-mark-cream.png" : "/brand/logo-mark-green.png";

  return (
    <img
      src={src}
      alt=""
      className={`rounded-full object-cover ${className}`}
      width={64}
      height={64}
    />
  );
}
