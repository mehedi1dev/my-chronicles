import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

const EMOJIS = ["☕", "🏔️", "🌊", "💻", "🎮", "📷", "✈️", "🐙"];

function shuffledDeck() {
  const deck = [...EMOJIS, ...EMOJIS]
    .map((v) => ({ id: Math.random(), value: v }))
    .sort(() => Math.random() - 0.5);
  return deck;
}

export default function MemoryMatch() {
  const [deck, setDeck] = useState(shuffledDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      setMoves((m) => m + 1);
      if (deck[a].value === deck[b].value) {
        setMatched((m) => [...m, deck[a].id, deck[b].id]);
        setFlipped([]);
      } else {
        const t = setTimeout(() => setFlipped([]), 700);
        return () => clearTimeout(t);
      }
    }
  }, [flipped, deck]);

  const flip = (i) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(deck[i].id)) return;
    setFlipped((f) => [...f, i]);
  };

  const reset = () => {
    setDeck(shuffledDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const won = matched.length === deck.length;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-sm opacity-70">
        {won ? `Solved in ${moves} moves! 🎉` : `Moves: ${moves}`}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {deck.map((card, i) => {
          const isUp = flipped.includes(i) || matched.includes(card.id);
          return (
            <motion.button
              key={card.id}
              onClick={() => flip(i)}
              whileTap={{ scale: 0.92 }}
              className="relative h-14 w-14 rounded-xl border border-current/15 sm:h-16 sm:w-16"
              style={{ perspective: 600 }}
            >
              <AnimatePresence initial={false} mode="wait">
                {isUp ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    className="flex h-full w-full items-center justify-center rounded-xl text-2xl"
                    style={{ background: "color-mix(in srgb, var(--color-teal) 18%, transparent)" }}
                  >
                    {card.value}
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    className="flex h-full w-full items-center justify-center rounded-xl bg-current/5 text-sm opacity-40"
                  >
                    ?
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <button
        onClick={reset}
        className="mt-5 flex items-center gap-2 rounded-full border border-current/15 px-4 py-2 text-sm hover:bg-current/5"
      >
        <RotateCcw size={14} /> Shuffle
      </button>
    </div>
  );
}
