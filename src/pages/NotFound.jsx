import { Link } from "react-router-dom";
import AnimatedButton from "../components/ui/AnimatedButton";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <p className="mt-3 text-lg opacity-70">This route hasn't been deployed yet.</p>
      <div className="mt-6">
        <AnimatedButton as={Link} to="/">Back to home</AnimatedButton>
      </div>
    </section>
  );
}
