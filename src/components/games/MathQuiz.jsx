import { useState } from "react";
import { Play, RotateCcw, Check, X } from "lucide-react";

const OPS = ["+", "-", "×", "÷"];
const TOTAL_QUESTIONS = 10;

function randForDigits(digits) {
  const min = digits === 1 ? 1 : Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeQuestion(op, d1, d2) {
  let a = randForDigits(d1);
  let b = randForDigits(d2);
  if (op === "÷") {
    // ensure clean division
    b = Math.max(1, b);
    a = b * randForDigits(d1);
  }
  if (op === "-" && b > a) [a, b] = [b, a];
  const answer = { "+": a + b, "-": a - b, "×": a * b, "÷": a / b }[op];
  return { text: `${a} ${op} ${b}`, answer };
}

export default function MathQuiz() {
  const [op, setOp] = useState("+");
  const [d1, setD1] = useState(1);
  const [d2, setD2] = useState(1);
  const [status, setStatus] = useState("setup"); // setup | playing | done
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong"

  const start = () => {
    setScore(0);
    setQIndex(1);
    setQuestion(makeQuestion(op, d1, d2));
    setInput("");
    setFeedback(null);
    setStatus("playing");
  };

  const submit = () => {
    if (input === "") return;
    const correct = Number(input) === question.answer;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (qIndex >= TOTAL_QUESTIONS) {
        setStatus("done");
      } else {
        setQIndex((q) => q + 1);
        setQuestion(makeQuestion(op, d1, d2));
        setInput("");
        setFeedback(null);
      }
    }, 500);
  };

  if (status === "setup") {
    return (
      <div className="flex flex-col items-center gap-5">
        <div>
          <p className="mb-2 text-center text-xs font-mono uppercase tracking-wide opacity-50">Operator</p>
          <div className="flex gap-2">
            {OPS.map((o) => (
              <button
                key={o}
                onClick={() => setOp(o)}
                className={`h-10 w-10 rounded-lg text-lg font-semibold ${op === o ? "bg-[var(--color-amber)] text-[var(--color-ink)]" : "bg-current/5"}`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="mb-2 text-center text-xs font-mono uppercase tracking-wide opacity-50">1st number digits</p>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setD1(n)} className={`h-9 w-9 rounded-lg text-sm font-medium ${d1 === n ? "bg-[var(--color-teal)] text-[var(--color-ink)]" : "bg-current/5"}`}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-center text-xs font-mono uppercase tracking-wide opacity-50">2nd number digits</p>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setD2(n)} className={`h-9 w-9 rounded-lg text-sm font-medium ${d2 === n ? "bg-[var(--color-teal)] text-[var(--color-ink)]" : "bg-current/5"}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={start} className="mt-2 flex items-center gap-2 rounded-full bg-[var(--color-amber)] px-6 py-2.5 text-sm font-medium text-[var(--color-ink)]">
          <Play size={15} /> Start quiz
        </button>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-display font-semibold">You scored {score} / {TOTAL_QUESTIONS}</p>
        <button onClick={() => setStatus("setup")} className="flex items-center gap-2 rounded-full border border-current/15 px-4 py-2 text-sm hover:bg-current/5">
          <RotateCcw size={14} /> Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="font-mono text-xs opacity-50">Question {qIndex} / {TOTAL_QUESTIONS} · Score {score}</p>
      <p className="font-display text-3xl font-bold">{question.text} = ?</p>
      <input
        autoFocus
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className="w-32 rounded-xl border border-current/15 bg-current/5 px-4 py-2 text-center text-lg outline-none"
      />
      <button
        onClick={submit}
        className="flex items-center gap-2 rounded-full bg-[var(--color-amber)] px-6 py-2 text-sm font-medium text-[var(--color-ink)]"
      >
        Submit
      </button>
      {feedback && (
        <p className={`flex items-center gap-1.5 text-sm font-medium ${feedback === "correct" ? "" : ""}`} style={{ color: feedback === "correct" ? "var(--color-teal)" : "#e05a45" }}>
          {feedback === "correct" ? <Check size={16} /> : <X size={16} />}
          {feedback === "correct" ? "Correct!" : `Answer: ${question.answer}`}
        </p>
      )}
    </div>
  );
}
