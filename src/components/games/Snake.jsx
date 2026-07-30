import { useEffect, useRef, useState } from "react";
import { RotateCcw, Play } from "lucide-react";

const COLS = 16;
const ROWS = 16;
const CELL = 18;

function randomFood(snake) {
  let food;
  do {
    food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export default function Snake() {
  const canvasRef = useRef(null);
  const dirRef = useRef({ x: 1, y: 0 });
  const nextDirRef = useRef({ x: 1, y: 0 });
  const snakeRef = useRef([{ x: 7, y: 8 }, { x: 6, y: 8 }, { x: 5, y: 8 }]);
  const foodRef = useRef(randomFood(snakeRef.current));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | playing | over

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
        a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
        W: { x: 0, y: -1 }, S: { x: 0, y: 1 },
        A: { x: -1, y: 0 }, D: { x: 1, y: 0 },
      };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (d.x === -cur.x && d.y === -cur.y) return;
      nextDirRef.current = d;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);
    ctx.fillStyle = "rgba(127,127,127,0.08)";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    ctx.fillStyle = "#e8735f";
    ctx.fillRect(foodRef.current.x * CELL + 2, foodRef.current.y * CELL + 2, CELL - 4, CELL - 4);

    snakeRef.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#f2a65a" : "#3fbfb0";
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
  };

  useEffect(() => { draw(); }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const interval = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const head = snakeRef.current[0];
      const newHead = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };

      if (
        newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS ||
        snakeRef.current.some((s) => s.x === newHead.x && s.y === newHead.y)
      ) {
        setStatus("over");
        return;
      }

      const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;
      const newSnake = [newHead, ...snakeRef.current];
      if (!ateFood) newSnake.pop();
      else {
        foodRef.current = randomFood(newSnake);
        setScore((s) => s + 1);
      }
      snakeRef.current = newSnake;
      draw();
    }, 170);
    return () => clearInterval(interval);
  }, [status]);

  const start = () => {
    snakeRef.current = [{ x: 7, y: 8 }, { x: 6, y: 8 }, { x: 5, y: 8 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodRef.current = randomFood(snakeRef.current);
    setScore(0);
    setStatus("playing");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex items-center gap-4 text-sm">
        <span className="font-mono">Score: {score}</span>
        {status === "over" && <span className="opacity-70">Game over — try again!</span>}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="rounded-xl border border-current/15"
        />
        {status !== "playing" && (
          <button
            onClick={start}
            className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl bg-black/40 text-sm font-medium text-white"
          >
            <Play size={16} /> {status === "over" ? "Play again" : "Start"}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs opacity-50">Use W A S D (or arrow keys) to steer</p>
      <button
        onClick={start}
        className="mt-4 flex items-center gap-2 rounded-full border border-current/15 px-4 py-2 text-sm hover:bg-current/5"
      >
        <RotateCcw size={14} /> Restart
      </button>
    </div>
  );
}
