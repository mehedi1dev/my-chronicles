import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Smile } from "lucide-react";
import TechBadge from "./TechBadge";
import { layoutJourney } from "../../utils/journeyLayout";

const TYPE_ICON = { work: Briefcase, education: GraduationCap, life: Smile };

// Lane 0 is the neutral "trunk" (like git's master). Lanes 1+ cycle through
// this palette — capped at 6 colors total, matching card borders to their line.
const BRANCH_COLORS = [
  "var(--color-teal)",
  "var(--color-amber)",
  "var(--color-violet)",
  "var(--color-coral)",
  "var(--color-amber-soft)",
];
const TRUNK_COLOR = "#9ca3af";

function laneColor(lane) {
  return lane === 0 ? TRUNK_COLOR : BRANCH_COLORS[(lane - 1) % BRANCH_COLORS.length];
}

function formatRange(start, end) {
  const fmt = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    return new Date(y, m - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  return `${fmt(start)}${end ? ` — ${fmt(end)}` : " — Present"}`;
}

const ROW_H = 112;
const LANE_STEP = 22;
const BASE_X = 24;

export default function JourneyGitGraph({ events }) {
  const { items, laneCount } = useMemo(() => layoutJourney(events), [events]);
  const [selected, setSelected] = useState(items[items.length - 1]?.id ?? null);

  // Each branch's line has to stay open for as long as that event is
  // actually running — not just until its own row, but through every later
  // row (on other lanes) that starts before this event ends. Compute that
  // per item, using time (endF), not lane reuse.
  const branches = useMemo(() => {
    return items
      .map((item, row) => {
        if (item.lane === 0) return null;
        let endRow = row;
        for (let r = row + 1; r < items.length; r++) {
          if (items[r].startF < item.endF) endRow = r;
          else break; // items are sorted by start, so nothing later can overlap either
        }
        return { lane: item.lane, startRow: row, endRow };
      })
      .filter(Boolean);
  }, [items]);

  const graphWidth = BASE_X + laneCount * LANE_STEP + 16;
  const graphHeight = items.length * ROW_H;
  // Latest at top: flip which pixel row each ascending-order index lands on,
  // while all the overlap/lane math above still runs in normal chronological order.
  const y = (row) => (items.length - 1 - row) * ROW_H + ROW_H / 2;
  const x = (lane) => BASE_X + lane * LANE_STEP;

  const paths = [];

  // Trunk: a continuous straight line down lane 0, the whole height.
  paths.push({
    d: `M ${x(0)} 0 L ${x(0)} ${graphHeight}`,
    color: TRUNK_COLOR,
    key: "trunk",
  });

  // Each branch: curve out from the trunk near its start (visually the
  // bottom, since start is chronologically earliest and latest is at top),
  // run straight for as long as the event is active, then curve back in
  // near its end (visually higher up) once it actually finishes.
  branches.forEach(({ lane, startRow, endRow }, i) => {
    const color = laneColor(lane);
    const branchY = y(startRow) + ROW_H / 2;
    const mergeY = endRow < items.length - 1 ? y(endRow) - ROW_H / 2 : null;

    let d = `M ${x(0)} ${branchY} C ${x(0)} ${branchY - 24}, ${x(lane)} ${y(startRow) + 24}, ${x(lane)} ${y(startRow)}`;
    d += ` L ${x(lane)} ${y(endRow)}`;
    if (mergeY !== null) {
      d += ` C ${x(lane)} ${y(endRow) - 24}, ${x(0)} ${mergeY + 24}, ${x(0)} ${mergeY}`;
    }
    paths.push({ d, color, key: `branch-${lane}-${i}` });
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs opacity-60">
        {["work", "education", "life"].map((type) => {
          const Icon = TYPE_ICON[type];
          return (
            <span key={type} className="flex items-center gap-1.5 capitalize">
              <Icon size={12} /> {type}
            </span>
          );
        })}
        <span className="opacity-50">· branches are chapters that overlapped in time</span>
      </div>

      <div className="overflow-x-auto">
        <div className="relative flex" style={{ minWidth: 560 }}>
          {/* graph column */}
          <div className="relative shrink-0" style={{ width: graphWidth, height: graphHeight }}>
            <svg width={graphWidth} height={graphHeight} className="absolute inset-0">
              {paths.map((p) => (
                <motion.path
                  key={p.key}
                  d={p.d}
                  fill="none"
                  stroke={p.color}
                  strokeWidth={p.key === "trunk" ? 2.5 : 3}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
              ))}
              {items.map((item, row) => (
                <motion.circle
                  key={item.id}
                  cx={x(item.lane)}
                  cy={y(row)}
                  r={selected === item.id ? 7 : 5.5}
                  fill={laneColor(item.lane)}
                  stroke="var(--color-paper)"
                  strokeWidth="2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(item.id)}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: row * 0.06 }}
                />
              ))}
            </svg>
          </div>

          {/* commit-style text rows — reversed so the DOM order (top to bottom) matches the flipped graph */}
          <div className="flex-1">
            {[...items].reverse().map((item) => {
              const color = laneColor(item.lane);
              const isSelected = selected === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  style={{ height: ROW_H }}
                  className={`flex w-full flex-col justify-center gap-1 border-b border-current/5 pl-4 pr-2 text-left last:border-none transition-colors ${
                    isSelected ? "bg-current/5" : "hover:bg-current/5"
                  }`}
                >
                  <p className="font-mono text-[10px] opacity-45">{formatRange(item.start, item.end)}</p>
                  <p className="font-display text-sm font-semibold sm:text-base" style={{ color }}>
                    {item.title} <span className="font-sans text-xs font-normal opacity-55">— {item.org}</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected event detail — kept outside the graph so row heights stay fixed and aligned */}
      {items
        .filter((item) => item.id === selected)
        .map((item) => {
          const color = laneColor(item.lane);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border-2 p-5"
              style={{ borderColor: color, background: `color-mix(in srgb, ${color} 6%, transparent)` }}
            >
              <p className="font-mono text-xs opacity-50">{formatRange(item.start, item.end)}</p>
              <p className="mt-1 font-display text-lg font-semibold" style={{ color }}>{item.title}</p>
              <p className="text-sm opacity-60">{item.org}</p>
              <p className="mt-3 text-sm leading-relaxed opacity-75">{item.desc}</p>
              <p className="mt-3 mb-1.5 font-mono text-[10px] uppercase tracking-wide opacity-40">Skills gained</p>
              <div className="flex flex-wrap gap-1.5">
                {item.skills.length > 0 ? (
                  item.skills.map((s) => <TechBadge key={s}>{s}</TechBadge>)
                ) : (
                  <p className="rounded-lg border border-dashed border-current/20 px-2.5 py-1.5 text-xs italic opacity-70">
                    {item.funnyFallback || "Too lazy to actually get good at this one. 😅"}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      <p className="mt-4 text-center text-xs opacity-45">Click any row (or its dot) for the full story.</p>
    </div>
  );
}
