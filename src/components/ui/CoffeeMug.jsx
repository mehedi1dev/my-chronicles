export default function CoffeeMug({ size = 64, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      {/* steam wisps */}
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <path
          className="steam-wisp"
          style={{ animationDelay: "0s" }}
          d="M24 18c-2 3 2 4 0 7s2 4 0 7"
        />
        <path
          className="steam-wisp"
          style={{ animationDelay: "0.8s" }}
          d="M32 15c-2 3 2 4 0 7s2 4 0 7"
        />
        <path
          className="steam-wisp"
          style={{ animationDelay: "1.6s" }}
          d="M40 18c-2 3 2 4 0 7s2 4 0 7"
        />
      </g>

      {/* mug body */}
      <path
        d="M14 28h30v14a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V28z"
        fill="var(--color-amber)"
      />
      <path
        d="M44 32h3a6 6 0 0 1 0 12h-3v-4h3a2 2 0 0 0 0-4h-3z"
        fill="var(--color-amber)"
      />
      {/* liquid highlight */}
      <ellipse cx="29" cy="29" rx="15" ry="2.5" fill="rgba(0,0,0,0.12)" />
      {/* handle shadow */}
      <rect x="14" y="41" width="30" height="4" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
}
