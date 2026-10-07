type LogoProps = {
  part?: "full" | "mark";
  className?: string;
};

export default function Logo({ part = "mark", className = "" }: LogoProps) {
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

  return (
    <img
      src="/brand/logo-mark-cream.png"
      alt=""
      className={`rounded-full object-cover ${className}`}
      width={64}
      height={64}
    />
  );
}
