import { motion } from "framer-motion";
import { lifeStages } from "../../data/faith";

const W = 64;
const H = 76;
const GROUND = 62;

// Each stage is its own small illustration so the animation actually matches
// the moment — a bottle for the newborn, a bouncing ball for the teen, a
// glowing screen for the researching adult, a pulsing word bubble for the
// advice-giving elder, and a mood-shifting sky over the grave.
function BornFigure() {
  return (
    <g>
      <circle cx="32" cy="30" r="9" fill="var(--color-amber)" />
      <path d="M22 40 q10 10 20 0 v14 q-10 8 -20 0 z" fill="var(--color-teal)" />
      <motion.g
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "44px 38px" }}
      >
        <rect x="41" y="24" width="7" height="16" rx="2" fill="#bcd8f0" stroke="var(--color-ink)" strokeOpacity="0.15" />
        <rect x="42.5" y="21" width="4" height="4" rx="1" fill="#e8735f" />
      </motion.g>
      <motion.circle
        cx="44" cy="30" r="1.4" fill="#fff"
        animate={{ cy: [34, 26, 34], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    </g>
  );
}

function ChildFigure() {
  return (
    <g>
      <circle cx="32" cy="24" r="8" fill="var(--color-amber)" />
      <line x1="32" y1="32" x2="32" y2="50" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      <motion.line
        x1="32" y1="50" x2="24" y2="60" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round"
        animate={{ x2: [24, 20, 24] }} transition={{ duration: 1.4, repeat: Infinity }}
      />
      <motion.line
        x1="32" y1="50" x2="40" y2="60" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round"
        animate={{ x2: [40, 44, 40] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
      />
    </g>
  );
}

function TeenFigure() {
  return (
    <g>
      <circle cx="28" cy="20" r="7.5" fill="var(--color-amber)" />
      <line x1="28" y1="27.5" x2="28" y2="48" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="48" x2="20" y2="58" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="48" x2="36" y2="56" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      <motion.circle
        cx="46" r="4" fill="var(--color-coral)"
        animate={{ cy: [58, 34, 58] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}

function AdultFigure() {
  return (
    <g>
      <circle cx="26" cy="22" r="7.5" fill="var(--color-amber)" />
      <line x1="26" y1="29.5" x2="26" y2="48" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="48" x2="19" y2="58" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="48" x2="33" y2="58" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      <rect x="36" y="34" width="20" height="14" rx="1.5" fill="none" stroke="var(--color-violet)" strokeWidth="2" />
      <motion.rect
        x="38" y="36" width="4" height="2" fill="var(--color-violet)"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <line x1="41" y1="48" x2="51" y2="48" stroke="var(--color-violet)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function ElderFigure() {
  return (
    <g>
      <g transform="rotate(9 32 40)">
        <circle cx="30" cy="24" r="7.5" fill="var(--color-amber)" />
        <line x1="30" y1="31.5" x2="34" y2="50" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="34" y1="50" x2="27" y2="59" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="34" y1="50" x2="41" y2="58" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="34" x2="46" y2="55" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      </g>
      <motion.g
        animate={{ opacity: [0, 1, 1, 0], y: [4, -2, -2, -6] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        <circle cx="14" cy="16" r="7" fill="none" stroke="var(--color-coral)" strokeWidth="1.6" />
        <path d="M9 21 l3 4 3-4" fill="var(--color-coral)" stroke="none" />
      </motion.g>
    </g>
  );
}

function ReturnFigure() {
  return (
    <g>
      <motion.g
        animate={{ opacity: [1, 1, 0.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.75, 1] }}
      >
        <circle cx="32" cy="16" r="8" fill="#ffd9a6" />
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.65, 1] }}
      >
        <ellipse cx="32" cy="16" rx="13" ry="7" fill="#2a2f45" />
        <motion.path
          d="M30 22 l-3 6 4 -1 -2 6"
          stroke="#ffd94a" strokeWidth="1.6" fill="none" strokeLinecap="round"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.62, 0.72] }}
        />
      </motion.g>
      <path d="M22 60V38a10 10 0 0 1 20 0v22z" fill="none" stroke="var(--color-violet)" strokeWidth="2.2" />
      <line x1="32" y1="42" x2="32" y2="48" stroke="var(--color-violet)" strokeWidth="2" />
      <line x1="29" y1="45" x2="35" y2="45" stroke="var(--color-violet)" strokeWidth="2" />
    </g>
  );
}

const FIGURES = [BornFigure, ChildFigure, TeenFigure, AdultFigure, ElderFigure, ReturnFigure];

export default function LifeJourney() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-3 gap-x-1 gap-y-10 sm:grid-cols-6">
        {lifeStages.map((stage, i) => {
          const Figure = FIGURES[i];
          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
                <line x1="4" y1={GROUND} x2={W - 4} y2={GROUND} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
                <Figure />
              </svg>
              <p className="mt-1 text-xs font-semibold">{stage.label}</p>
              <p className="mt-1 text-[10px] leading-snug opacity-55">{stage.note}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="mt-10 text-center text-sm italic opacity-70"
      >
        "Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection."
        <span className="mt-1 block font-mono text-xs not-italic opacity-50">— Surah Al-Imran 3:185</span>
      </motion.p>
    </div>
  );
}
