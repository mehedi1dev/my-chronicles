import {
  Code2, Terminal, Coffee, GitBranch, Keyboard, Cpu,
  Plane, Mountain, Waves, Compass, Camera, Map,
  Gamepad2, Mouse, MonitorSmartphone,
  BookOpen, GraduationCap, NotebookText,
  BrainCircuit, Bot,
  Mail, Phone, MapPin, MessageCircle,
  Moon, Landmark, Sparkles, BookMarked,
} from "lucide-react";

const ICON_SETS = {
  coding: [Code2, Terminal, Coffee, GitBranch, Keyboard, Cpu],
  travel: [Plane, Mountain, Waves, Compass, Camera, Map],
  gaming: [Gamepad2, Mouse, MonitorSmartphone, Keyboard],
  education: [BookOpen, GraduationCap, NotebookText, Code2],
  ai: [BrainCircuit, Bot, Cpu, Code2],
  contact: [Mail, Phone, MapPin, MessageCircle],
  faith: [Moon, Landmark, BookMarked, Sparkles, BookOpen, Compass],
};

// Deterministic pseudo-random layout so doodles don't shift on re-render
const LAYOUT = [
  { top: "8%", left: "6%", size: 40, delay: "float" },
  { top: "18%", left: "88%", size: 32, delay: "float-slow" },
  { top: "70%", left: "4%", size: 46, delay: "float-slower" },
  { top: "82%", left: "90%", size: 34, delay: "float" },
  { top: "40%", left: "94%", size: 28, delay: "float-slow" },
  { top: "55%", left: "2%", size: 30, delay: "float-slower" },
];

const PALETTE = [
  "var(--doodle-1)",
  "var(--doodle-2)",
  "var(--doodle-3)",
  "var(--doodle-4)",
  "var(--doodle-5)",
  "var(--doodle-6)",
];

export default function Doodles({ theme = "coding", className = "" }) {
  const icons = ICON_SETS[theme] || ICON_SETS.coding;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {LAYOUT.map((pos, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Icon
            key={i}
            className={`absolute opacity-[0.3] animate-${pos.delay}`}
            style={{ top: pos.top, left: pos.left, width: pos.size, height: pos.size, color: PALETTE[i % PALETTE.length] }}
            strokeWidth={1.3}
          />
        );
      })}
    </div>
  );
}
