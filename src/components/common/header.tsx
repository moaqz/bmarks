import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="h-15 flex items-center justify-between">
      <Link to="/" className="font-extrabold">bmarks</Link>
    </header>
  );
}
