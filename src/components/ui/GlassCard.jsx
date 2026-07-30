export default function GlassCard({ children, className = "", as: As = "div", ...props }) {
  return (
    <As className={`glass rounded-2xl shadow-xl shadow-black/5 ${className}`} {...props}>
      {children}
    </As>
  );
}
