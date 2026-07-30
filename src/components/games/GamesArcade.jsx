import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import TicTacToe from "./TicTacToe";
import MemoryMatch from "./MemoryMatch";
import RockPaperScissors from "./RockPaperScissors";
import Snake from "./Snake";
import PacChase from "./PacChase";
import BreakoutBall from "./BreakoutBall";
import LaneRacer from "./LaneRacer";
import MathQuiz from "./MathQuiz";
import NeonDodge from "./NeonDodge";

const GAMES = [
  { id: "tictactoe", label: "Tic-Tac-Toe", Component: TicTacToe },
  { id: "memory", label: "Memory Match", Component: MemoryMatch },
  { id: "rps", label: "Rock Paper Scissors", Component: RockPaperScissors },
  { id: "snake", label: "Snake", Component: Snake },
  { id: "pacchase", label: "Pac-Chase", Component: PacChase },
  { id: "breakout", label: "DX-Ball", Component: BreakoutBall },
  { id: "racer", label: "Lane Racer", Component: LaneRacer },
  { id: "mathquiz", label: "Math Quiz", Component: MathQuiz },
  { id: "neondodge", label: "Neon Dodge", Component: NeonDodge },
];

export default function GamesArcade() {
  const [active, setActive] = useState(GAMES[0].id);
  const current = GAMES.find((g) => g.id === active);

  return (
    <div>
      <GlassCard className="grid grid-cols-1 overflow-hidden border-current/10 sm:grid-cols-[170px_1fr]">
        {/* Left: game list */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-current/10 p-3 sm:max-h-[520px] sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:border-b-0 sm:border-r">
          {GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                active === g.id
                  ? "bg-[var(--color-amber)] text-[var(--color-ink)]"
                  : "bg-current/5 hover:bg-current/10"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Right: active game */}
        <div className="p-5 sm:p-7">
          <p className="mb-4 text-center font-display text-lg font-semibold">{current.label}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <current.Component />
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassCard>
      <p className="mt-3 text-center text-xs opacity-45">
        All games run entirely in your browser — free, no install, no sign-up.
      </p>
    </div>
  );
}
