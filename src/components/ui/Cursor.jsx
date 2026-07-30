import { useEffect, useRef } from "react";
import { useMousePosition } from "../../hooks/useMousePosition";

export default function Cursor() {
  const { x, y } = useMousePosition();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf;
    const animate = () => {
      ring.current.x += (x - ring.current.x) * 0.18;
      ring.current.y += (y - ring.current.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [x, y]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
