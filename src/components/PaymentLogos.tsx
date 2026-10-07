type Props = {
  brand: "mtn" | "orange";
  className?: string;
};

/** Logos stylisés MTN MoMo / Orange Money (SVG inline). */
export function PaymentLogo({ brand, className = "h-10 w-auto" }: Props) {
  if (brand === "mtn") {
    return (
      <svg
        className={className}
        viewBox="0 0 128 40"
        role="img"
        aria-label="MTN Mobile Money"
      >
        <rect width="128" height="40" rx="10" fill="#FFCC00" />
        <text
          x="64"
          y="18"
          textAnchor="middle"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="14"
          fill="#1a1a1a"
        >
          MTN
        </text>
        <text
          x="64"
          y="31"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="8"
          fill="#1a1a1a"
          letterSpacing="1.2"
        >
          MoMo
        </text>
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 148 40"
      role="img"
      aria-label="Orange Money"
    >
      <rect width="148" height="40" rx="10" fill="#FF7900" />
      <circle cx="20" cy="20" r="9" fill="#fff" />
      <text
        x="88"
        y="25"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#ffffff"
      >
        Orange Money
      </text>
    </svg>
  );
}

export function PaymentMark({ brand }: { brand: "mtn" | "orange" }) {
  if (brand === "mtn") {
    return (
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-[11px] font-black leading-tight tracking-tight"
        style={{ background: "#FFCC00", color: "#1a1a1a" }}
        aria-hidden
      >
        MTN
      </span>
    );
  }
  return (
    <span
      className="flex h-12 w-12 items-center justify-center rounded-2xl"
      style={{ background: "#FF7900" }}
      aria-hidden
    >
      <span className="h-5 w-5 rounded-full bg-white" />
    </span>
  );
}
