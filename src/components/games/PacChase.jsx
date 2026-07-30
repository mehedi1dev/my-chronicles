import { useEffect, useRef, useState } from "react";
import { RotateCcw, Play } from "lucide-react";

const CELL = 20;
// 1 = wall, 0 = dot, 2 = empty (no dot)
const RAW = [
  "1111111111111",
  "1000000000001",
  "1011110111101",
  "1010000000101",
  "1010111101101",
  "1000100000001",
  "1110101110111",
  "1000101000001",
  "1011101011101",
  "1010000000101",
  "1010111110101",
  "1000000000001",
  "1111111111111",
];

function buildMaze() {
  return RAW.map((row) => row.split("").map((ch) => (ch === "1" ? 1 : 0)));
}

const ROWS = RAW.length;
const COLS = RAW[0].length;
const DIRS = {
  ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
  w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
  W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0],
};

export default function PacChase() {
  const canvasRef = useRef(null);
  const mazeRef = useRef(buildMaze());
  const playerRef = useRef({ x: 1, y: 1 });
  const dirRef = useRef([0, 0]);
  const nextDirRef = useRef([0, 0]);
  const ghostRef = useRef({ x: COLS - 2, y: ROWS - 2 });
  const dotsLeftRef = useRef(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | playing | won | lost

  useEffect(() => {
    const onKey = (e) => {
      const d = DIRS[e.key];
      if (!d) return;
      e.preventDefault();
      nextDirRef.current = d;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const walkable = (x, y) => y >= 0 && y < ROWS && x >= 0 && x < COLS && mazeRef.current[y][x] !== 1;

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const v = mazeRef.current[y][x];
        if (v === 1) {
          ctx.fillStyle = "rgba(139,127,214,0.35)";
          ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
        } else if (v === 0) {
          ctx.fillStyle = "rgba(242,166,90,0.8)";
          ctx.beginPath();
          ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const p = playerRef.current;
    ctx.fillStyle = "#f2a65a";
    ctx.beginPath();
    ctx.arc(p.x * CELL + CELL / 2, p.y * CELL + CELL / 2, CELL / 2 - 2, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(p.x * CELL + CELL / 2, p.y * CELL + CELL / 2);
    ctx.fill();

    const g = ghostRef.current;
    ctx.fillStyle = "#e8735f";
    ctx.beginPath();
    ctx.arc(g.x * CELL + CELL / 2, g.y * CELL + CELL / 2 - 2, CELL / 2 - 3, Math.PI, 0);
    ctx.lineTo(g.x * CELL + CELL - 3, g.y * CELL + CELL - 2);
    ctx.lineTo(g.x * CELL + 3, g.y * CELL + CELL - 2);
    ctx.fill();
  };

  useEffect(() => { draw(); }, []);

  const reset = () => {
    mazeRef.current = buildMaze();
    playerRef.current = { x: 1, y: 1 };
    dirRef.current = [0, 0];
    nextDirRef.current = [0, 0];
    ghostRef.current = { x: COLS - 2, y: ROWS - 2 };
    let dots = 0;
    mazeRef.current.forEach((row) => row.forEach((v) => { if (v === 0) dots++; }));
    dotsLeftRef.current = dots;
    setScore(0);
    setStatus("playing");
    draw();
  };

  useEffect(() => {
    if (status !== "playing") return;
    const interval = setInterval(() => {
      const [ndx, ndy] = nextDirRef.current;
      const p = playerRef.current;
      if (walkable(p.x + ndx, p.y + ndy)) dirRef.current = [ndx, ndy];
      const [dx, dy] = dirRef.current;
      if (walkable(p.x + dx, p.y + dy)) {
        p.x += dx;
        p.y += dy;
      }
      if (mazeRef.current[p.y][p.x] === 0) {
        mazeRef.current[p.y][p.x] = 2;
        dotsLeftRef.current -= 1;
        setScore((s) => s + 10);
      }

      // ghost: greedy chase with a little randomness
      const g = ghostRef.current;
      const options = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([gx, gy]) => walkable(g.x + gx, g.y + gy));
      if (options.length) {
        let choice;
        if (Math.random() < 0.4) {
          options.sort((a, b) => {
            const da = Math.hypot(g.x + a[0] - p.x, g.y + a[1] - p.y);
            const db = Math.hypot(g.x + b[0] - p.x, g.y + b[1] - p.y);
            return da - db;
          });
          choice = options[0];
        } else {
          choice = options[Math.floor(Math.random() * options.length)];
        }
        g.x += choice[0];
        g.y += choice[1];
      }

      if (g.x === p.x && g.y === p.y) {
        setStatus("lost");
      } else if (dotsLeftRef.current <= 0) {
        setStatus("won");
      }
      draw();
    }, 260);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex items-center gap-4 text-sm">
        <span className="font-mono">Score: {score}</span>
        {status === "won" && <span className="opacity-70">All dots eaten — you win! 🎉</span>}
        {status === "lost" && <span className="opacity-70">Caught! Try again.</span>}
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
            onClick={reset}
            className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl bg-black/40 text-sm font-medium text-white"
          >
            <Play size={16} /> {status === "idle" ? "Start" : "Play again"}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs opacity-50">Use W A S D (or arrow keys) — eat every dot, avoid the ghost</p>
      <button
        onClick={reset}
        className="mt-4 flex items-center gap-2 rounded-full border border-current/15 px-4 py-2 text-sm hover:bg-current/5"
      >
        <RotateCcw size={14} /> Restart
      </button>
    </div>
  );
}
