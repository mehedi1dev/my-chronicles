import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const W = 320;
const H = 380;
const PADDLE_W = 64;
const PADDLE_H = 10;
const BALL_R = 6;
const ROWS = 5;
const COLS = 8;
const BRICK_W = W / COLS;
const BRICK_H = 16;
const COLORS = ["#f2a65a", "#e8735f", "#3fbfb0", "#8b7fd6", "#f2d9ad"];

function buildBricks() {
  const bricks = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      bricks.push({ x: c * BRICK_W, y: r * BRICK_H + 30, alive: true, color: COLORS[r % COLORS.length] });
    }
  }
  return bricks;
}

export default function BreakoutBall() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const paddleRef = useRef(W / 2 - PADDLE_W / 2);
  const ballRef = useRef({ x: W / 2, y: H - 40, vx: 1.6, vy: -2.1 });
  const bricksRef = useRef(buildBricks());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState("idle"); // idle | playing | won | lost

  useEffect(() => {
    const canvas = canvasRef.current;
    const move = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * W;
      paddleRef.current = Math.min(Math.max(x - PADDLE_W / 2, 0), W - PADDLE_W);
    };
    const onMouse = (e) => move(e.clientX);
    const onTouch = (e) => { if (e.touches[0]) move(e.touches[0].clientX); };
    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") paddleRef.current = Math.max(paddleRef.current - 24, 0);
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") paddleRef.current = Math.min(paddleRef.current + 24, W - PADDLE_W);
    };
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouch);
    window.addEventListener("keydown", onKey);
    return () => {
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(242,166,90,0.06)";
    ctx.fillRect(0, 0, W, H);

    bricksRef.current.forEach((b) => {
      if (!b.alive) return;
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x + 1, b.y + 1, BRICK_W - 2, BRICK_H - 2);
    });

    ctx.fillStyle = "#3fbfb0";
    ctx.fillRect(paddleRef.current, H - 16, PADDLE_W, PADDLE_H);

    ctx.beginPath();
    ctx.fillStyle = "#f2a65a";
    ctx.arc(ballRef.current.x, ballRef.current.y, BALL_R, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => { draw(); }, []);

  const resetBall = () => {
    ballRef.current = { x: W / 2, y: H - 40, vx: 1.6 * (Math.random() < 0.5 ? -1 : 1), vy: -2.1 };
  };

  const start = () => {
    bricksRef.current = buildBricks();
    paddleRef.current = W / 2 - PADDLE_W / 2;
    resetBall();
    setScore(0);
    setLives(3);
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;
    const loop = () => {
      const ball = ballRef.current;
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < BALL_R || ball.x > W - BALL_R) ball.vx *= -1;
      if (ball.y < BALL_R) ball.vy *= -1;

      if (
        ball.y > H - 16 - BALL_R &&
        ball.y < H - 6 &&
        ball.x > paddleRef.current &&
        ball.x < paddleRef.current + PADDLE_W
      ) {
        const hitPos = (ball.x - (paddleRef.current + PADDLE_W / 2)) / (PADDLE_W / 2);
        ball.vx = hitPos * 2.8;
        ball.vy = -Math.abs(ball.vy);
      }

      bricksRef.current.forEach((b) => {
        if (!b.alive) return;
        if (
          ball.x > b.x && ball.x < b.x + BRICK_W &&
          ball.y - BALL_R < b.y + BRICK_H && ball.y + BALL_R > b.y
        ) {
          b.alive = false;
          ball.vy *= -1;
          setScore((s) => s + 10);
        }
      });

      if (ball.y > H + 20) {
        setLives((l) => {
          const remaining = l - 1;
          if (remaining <= 0) {
            setStatus("lost");
          } else {
            resetBall();
          }
          return remaining;
        });
      }

      if (bricksRef.current.every((b) => !b.alive)) {
        setStatus("won");
      }

      draw();
      if (status === "playing") rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [status]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex items-center gap-4 text-sm">
        <span className="font-mono">Score: {score}</span>
        <span className="font-mono">Lives: {"❤️".repeat(Math.max(lives, 0))}</span>
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
            {status === "won" ? `All bricks cleared — ${score} pts! Play again` : status === "lost" ? "Out of lives — try again" : "Start"}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs opacity-50">Move the mouse, drag, or use A / D (arrow keys work too)</p>
    </div>
  );
}
