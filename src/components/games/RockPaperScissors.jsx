import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHOICES = [
  { id: "rock", emoji: "🪨", beats: "scissors" },
  { id: "paper", emoji: "📄", beats: "rock" },
  { id: "scissors", emoji: "✂️", beats: "paper" },
];

export default function RockPaperScissors() {
  const [me, setMe] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [score, setScore] = useState({ me: 0, cpu: 0 });
  const [result, setResult] = useState("");

  const play = (choice) => {
    const cpuChoice = CHOICES[Math.floor(Math.random() * 3)];
    setMe(choice);
    setCpu(cpuChoice);
    if (choice.id === cpuChoice.id) {
      setResult("It's a tie!");
    } else if (choice.beats === cpuChoice.id) {
      setResult("You win this round! 🎉");
      setScore((s) => ({ ...s, me: s.me + 1 }));
    } else {
      setResult("CPU wins this round.");
      setScore((s) => ({ ...s, cpu: s.cpu + 1 }));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-8 font-mono text-sm">
        <span>You: <b>{score.me}</b></span>
        <span>CPU: <b>{score.cpu}</b></span>
      </div>

      <div className="mb-6 flex h-20 items-center gap-8 text-4xl">
        <AnimatePresence mode="wait">
          {me && (
            <motion.span key={me.id + "me"} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}>
              {me.emoji}
            </motion.span>
          )}
        </AnimatePresence>
        <span className="text-sm opacity-40">vs</span>
        <AnimatePresence mode="wait">
          {cpu && (
            <motion.span key={cpu.id + "cpu"} initial={{ scale: 0, rotate: 30 }} animate={{ scale: 1, rotate: 0 }}>
              {cpu.emoji}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {result && <p className="mb-5 text-sm opacity-75">{result}</p>}

      <div className="flex gap-3">
        {CHOICES.map((c) => (
          <motion.button
            key={c.id}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => play(c)}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-current/15 bg-current/5 text-2xl"
          >
            {c.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
