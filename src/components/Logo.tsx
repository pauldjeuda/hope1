type LogoProps = {
  part?: "full" | "mark";
  className?: string;
  theme?: "dark" | "light" | "photo";
};

export default function Logo({
  part = "full",
  className = "",
  theme = "light",
}: LogoProps) {
  if (part === "mark") {
    // Pastille crème : lisible sur fond photo (navbar) et fond clair
    const src =
      theme === "dark"
        ? "/brand/logo-mark.png"
        : "/brand/logo-mark-cream.png";

    return (
      <img
        src={src}
        alt=""
        className={`object-contain ${className}`}
        width={64}
        height={64}
        decoding="async"
      />
    );
  }

  return (
    <img
      src="/brand/logo-full.png"
      alt="HOPE Bridge for the Needy"
      className={`object-contain ${className}`}
      width={220}
      height={124}
      decoding="async"
    />
  );
}
