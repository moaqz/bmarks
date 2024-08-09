import { Link } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center h-15 justify-between">
      <Link to="/" className="font-extrabold">
        bmarks
      </Link>

      {user
        ? <button type="button" className="button" onClick={logout}>Logout</button>
        : null}
    </header>
  );
}
