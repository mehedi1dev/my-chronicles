export default function WavingHand({ size = 96, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {/* head */}
      <circle cx="42" cy="34" r="16" fill="var(--color-amber)" />
      {/* body */}
      <path d="M22 90c0-16 9-30 20-30s20 14 20 30" fill="var(--color-teal)" />
      {/* waving arm group, rotates from the shoulder */}
      <g className="wave-hand">
        <path
          d="M58 62c4-10 6-22 4-30-1-4 2-7 5-6 3 1 4 5 4 9 1 9-1 20-5 29z"
          fill="var(--color-coral)"
        />
        <circle cx="68" cy="24" r="8" fill="#ffd9b3" />
      </g>
    </svg>
  );
}
