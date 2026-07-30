import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Cpu } from "lucide-react";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winnerOf(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? "draw" : null;
}

// Minimax — CPU plays "O" optimally (unbeatable, but not needlessly cruel).
function minimax(board, depth, isMaximizing) {
  const result = winnerOf(board);
  if (result === "O") return 10 - depth;
  if (result === "X") return depth - 10;
  if (result === "draw") return 0;

  const scores = [];
  board.forEach((cell, i) => {
    if (cell) return;
    const next = [...board];
    next[i] = isMaximizing ? "O" : "X";
    scores.push(minimax(next, depth + 1, !isMaximizing));
  });
  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board) {
  let best = { score: -Infinity, index: -1 };
  board.forEach((cell, i) => {
    if (cell) return;
    const next = [...board];
    next[i] = "O";
    const score = minimax(next, 0, false);
    if (score > best.score) best = { score, index: i };
  });
  return best.index;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [tally, setTally] = useState({ X: 0, O: 0, draw: 0 });
  const winner = winnerOf(board);

  const play = (i) => {
    if (board[i] || winner || turn !== "X") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  };

  // CPU turn
  useEffect(() => {
    if (turn !== "O" || winner) return;
    const t = setTimeout(() => {
      setBoard((b) => {
        const i = bestMove(b);
        if (i === -1) return b;
        const next = [...b];
        next[i] = "O";
        return next;
      });
      setTurn("X");
    }, 500);
    return () => clearTimeout(t);
  }, [turn, winner]);

  useEffect(() => {
    if (!winner) return;
    setTally((t) => ({ ...t, [winner === "draw" ? "draw" : winner]: t[winner === "draw" ? "draw" : winner] + 1 }));
  }, [winner]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 flex items-center gap-4 text-xs font-mono opacity-60">
        <span>You (X): {tally.X}</span>
        <span>CPU (O): {tally.O}</span>
        <span>Draws: {tally.draw}</span>
      </div>
      <p className="mb-4 flex items-center gap-1.5 text-sm opacity-70">
        {winner
          ? winner === "draw"
            ? "It's a draw!"
            : winner === "X"
              ? "You win! 🎉"
              : "CPU wins this one."
          : turn === "X"
            ? "Your turn (X)"
            : (
              <>
                <Cpu size={13} className="animate-pulse" /> CPU is thinking…
              </>
            )}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: cell || turn !== "X" ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => play(i)}
            className="flex h-20 w-20 items-center justify-center rounded-xl border border-current/15 bg-current/5 font-display text-3xl font-bold sm:h-24 sm:w-24"
            style={{ color: cell === "X" ? "var(--color-amber)" : "var(--color-teal)" }}
          >
            {cell}
          </motion.button>
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-5 flex items-center gap-2 rounded-full border border-current/15 px-4 py-2 text-sm hover:bg-current/5"
      >
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  );
}
