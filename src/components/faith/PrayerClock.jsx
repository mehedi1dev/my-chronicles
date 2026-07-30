import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIZE = 280;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 110;

function timeToFraction(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return (h + m / 60) / 24;
}

// 0 fraction = top of circle (midnight), moving clockwise.
function polar(fraction, radius = R) {
  const angle = fraction * 360 - 90;
  const rad = (angle * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function arcPath(fromFrac, toFrac, radius = R) {
  let start = fromFrac;
  let end = toFrac;
  if (end <= start) end += 1;
  const p1 = polar(start % 1, radius);
  const p2 = polar(end % 1, radius);
  const largeArc = end - start > 0.5 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
}

const SEGMENTS = (t) => [
  { from: t.Isha, to: t.Fajr, color: "#1b2340", label: "Night" },
  { from: t.Fajr, to: t.Sunrise, color: "#e8735f", label: "Dawn" },
  { from: t.Sunrise, to: t.Dhuhr, color: "#ffd9a6", label: "Morning" },
  { from: t.Dhuhr, to: t.Asr, color: "#f2a65a", label: "Midday" },
  { from: t.Asr, to: t.Maghrib, color: "#e0955a", label: "Afternoon" },
  { from: t.Maghrib, to: t.Isha, color: "#5a4a8a", label: "Dusk" },
];

const MARKERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function PrayerClock({ times }) {
  const [hovered, setHovered] = useState(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 3000);
    return () => clearInterval(t);
  }, []);

  const nowFraction = (now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600) / 24;
  const needle = polar(nowFraction, R + 14);

  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="relative">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {SEGMENTS(times).map((seg, i) => (
          <path
            key={i}
            d={arcPath(timeToFraction(seg.from), timeToFraction(seg.to))}
            stroke={seg.color}
            strokeWidth="16"
            fill="none"
            strokeLinecap="butt"
          />
        ))}

        {/* hour ticks */}
        {Array.from({ length: 24 }).map((_, h) => {
          const p1 = polar(h / 24, R - 12);
          const p2 = polar(h / 24, R - 6);
          return <line key={h} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />;
        })}

        {/* prayer markers */}
        {MARKERS.map((name) => {
          const frac = timeToFraction(times[name]);
          const p = polar(frac);
          return (
            <circle
              key={name}
              cx={p.x} cy={p.y}
              r={hovered === name ? 7 : 5}
              fill="var(--color-paper)"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
              style={{ cursor: "pointer", transition: "r 0.15s" }}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}

        {/* current time needle */}
        <motion.line
          x1={CX} y1={CY} x2={needle.x} y2={needle.y}
          stroke="var(--color-coral)" strokeWidth="2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        />
        <circle cx={CX} cy={CY} r="4" fill="var(--color-coral)" />

        {/* center label */}
        <text x={CX} y={CY - 8} textAnchor="middle" className="fill-current" style={{ fontSize: 11, opacity: 0.5, fontFamily: "monospace" }}>
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" className="fill-current" style={{ fontSize: 9, opacity: 0.4 }}>
          NOW
        </text>
        </svg>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+70px)] whitespace-nowrap rounded-full bg-black/75 px-3 py-1 text-[11px] text-white"
            >
              {hovered} · {times[hovered]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px] opacity-60">
        {SEGMENTS(times).map((seg) => (
          <span key={seg.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: seg.color }} />
            {seg.label}
          </span>
        ))}
      </div>
    </div>
  );
}
