import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const W = 300;
const H = 400;
const PLAYER_W = 14;
const PLAYER_SPEED = 4.5;

export default function NeonDodge() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const playerXRef = useRef(W / 2);
  const keysRef = useRef({ left: false, right: false });
  const blocksRef = useRef([]);
  const speedRef = useRef(2);
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | playing | over

  useEffect(() => {
    const onDown = (e) => {
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") keysRef.current.left = true;
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") keysRef.current.right = true;
    };
    const onUp = (e) => {
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") keysRef.current.left = false;
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") keysRef.current.right = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const isDark = document.documentElement.classList.contains("dark");
    ctx.fillStyle = isDark ? "#0a0e17" : "#eef1f6";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = isDark ? "rgba(63,191,176,0.15)" : "rgba(47,143,130,0.22)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }

    blocksRef.current.forEach((b) => {
      ctx.fillStyle = "rgba(232,115,95,0.9)";
      ctx.shadowColor = "#e8735f";
      ctx.shadowBlur = 10;
      ctx.fillRect(b.x, b.y, b.w, 10);
    });
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#3fbfb0";
    ctx.shadowColor = "#3fbfb0";
    ctx.shadowBlur = 14;
    ctx.fillRect(playerXRef.current - PLAYER_W / 2, H - 24, PLAYER_W, 10);
    ctx.shadowBlur = 0;
  };

  useEffect(() => { draw(); }, []);

  const start = () => {
    playerXRef.current = W / 2;
    blocksRef.current = [];
    speedRef.current = 1.6;
    scoreRef.current = 0;
    setScore(0);
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;
    let frame = 0;
    const loop = () => {
      frame++;
      if (keysRef.current.left) playerXRef.current = Math.max(PLAYER_W / 2, playerXRef.current - PLAYER_SPEED);
      if (keysRef.current.right) playerXRef.current = Math.min(W - PLAYER_W / 2, playerXRef.current + PLAYER_SPEED);

      speedRef.current = Math.min(speedRef.current + 0.0008, 4.5);
      if (frame % Math.max(30, 55 - Math.floor(speedRef.current * 6)) === 0) {
        const bw = 40 + Math.random() * 50;
        blocksRef.current.push({ x: Math.random() * (W - bw), y: -10, w: bw });
      }
      blocksRef.current.forEach((b) => { b.y += speedRef.current; });
      blocksRef.current = blocksRef.current.filter((b) => b.y < H + 10);

      scoreRef.current += 1;
      setScore(Math.floor(scoreRef.current / 10));

      const px = playerXRef.current - PLAYER_W / 2;
      const py = H - 24;
      const hit = blocksRef.current.some(
        (b) => py < b.y + 10 && py + 10 > b.y && px < b.x + b.w && px + PLAYER_W > b.x
      );

      draw();
      if (hit) {
        setStatus("over");
        setBest((b) => Math.max(b, Math.floor(scoreRef.current / 10)));
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [status]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex items-center gap-4 text-sm">
        <span className="font-mono">Score: {score}</span>
        <span className="font-mono">Best: {best}</span>
      </div>
      <div className="relative">
        <canvas ref={canvasRef} width={W} height={H} className="rounded-xl border border-current/15" />
        {status !== "playing" && (
          <button
            onClick={start}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/50 text-sm font-medium text-white"
          >
            <Play size={18} />
            {status === "over" ? "Hit — play again" : "Start"}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs opacity-50">Use A / D (or ← →) to dodge the falling bars</p>
    </div>
  );
}
