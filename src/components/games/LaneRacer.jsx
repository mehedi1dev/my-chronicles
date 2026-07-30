import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const W = 280;
const H = 400;
const LANES = 3;
const LANE_W = W / LANES;
const CAR_W = 34;
const CAR_H = 56;

function laneX(lane) {
  return lane * LANE_W + LANE_W / 2 - CAR_W / 2;
}

export default function LaneRacer() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const laneRef = useRef(1);
  const obstaclesRef = useRef([]);
  const speedRef = useRef(1.8);
  const distanceRef = useRef(0);
  const roadOffsetRef = useRef(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | playing | over

  const moveLane = (dir) => {
    laneRef.current = Math.min(Math.max(laneRef.current + dir, 0), LANES - 1);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (status !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") moveLane(-1);
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") moveLane(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status]);

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const isDark = document.documentElement.classList.contains("dark");
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isDark ? "#1b2233" : "#e4e7ee";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.25)" : "rgba(20,25,40,0.25)";
    ctx.setLineDash([16, 14]);
    ctx.lineWidth = 2;
    for (let l = 1; l < LANES; l++) {
      ctx.beginPath();
      ctx.moveTo(l * LANE_W, roadOffsetRef.current % 30);
      ctx.lineTo(l * LANE_W, H);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.fillStyle = "#e8735f";
    obstaclesRef.current.forEach((o) => {
      ctx.fillRect(laneX(o.lane) + 3, o.y, CAR_W - 6, CAR_H - 10);
    });

    ctx.fillStyle = "#f2a65a";
    ctx.fillRect(laneX(laneRef.current), H - CAR_H - 12, CAR_W, CAR_H);
  };

  useEffect(() => { draw(); }, []);

  const start = () => {
    laneRef.current = 1;
    obstaclesRef.current = [];
    speedRef.current = 1.8;
    distanceRef.current = 0;
    roadOffsetRef.current = 0;
    setScore(0);
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;
    let frame = 0;
    const loop = () => {
      frame++;
      roadOffsetRef.current += speedRef.current;
      speedRef.current = Math.min(speedRef.current + 0.0012, 5.5);

      if (frame % Math.max(28, 60 - Math.floor(speedRef.current * 4)) === 0) {
        obstaclesRef.current.push({ lane: Math.floor(Math.random() * LANES), y: -CAR_H });
      }
      obstaclesRef.current.forEach((o) => { o.y += speedRef.current; });
      obstaclesRef.current = obstaclesRef.current.filter((o) => o.y < H + CAR_H);

      distanceRef.current += speedRef.current;
      setScore(Math.floor(distanceRef.current / 10));

      const playerY = H - CAR_H - 12;
      const collided = obstaclesRef.current.some(
        (o) => o.lane === laneRef.current && o.y + CAR_H - 10 > playerY && o.y < playerY + CAR_H
      );

      draw();
      if (collided) {
        setStatus("over");
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
        <span className="font-mono">Distance: {score}m</span>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="rounded-xl border border-current/15"
        />
        {status !== "playing" && (
          <button
            onClick={start}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-black/40 text-sm font-medium text-white"
          >
            <Play size={18} />
            {status === "over" ? `Crashed at ${score}m — play again` : "Start"}
          </button>
        )}
      </div>
      <div className="mt-4 flex gap-3 sm:hidden">
        <button onClick={() => moveLane(-1)} className="rounded-lg bg-current/10 px-5 py-2">←</button>
        <button onClick={() => moveLane(1)} className="rounded-lg bg-current/10 px-5 py-2">→</button>
      </div>
      <p className="mt-3 text-xs opacity-50">Use A / D (or ← →) to switch lanes and dodge traffic</p>
    </div>
  );
}
