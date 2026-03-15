import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="font-serif text-8xl text-primary mb-4">404</div>
      <h1 className="font-serif text-3xl font-normal mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition"
      >
        <Home className="w-4 h-4" />
        Back to HomeValue
      </Link>
    </div>
  );
}
