import { Link } from "react-router-dom";
import { GITHUB_REPOSITORY } from "~/constants/social";

export function Footer() {
  return (
    <footer className="py-6 flex flex-col gap-y-1 items-center sm:flex-row sm:justify-between text-gray-11 text-sm">
      <div className="flex items-center gap-3">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/bookmarks" className="hover:underline">
          Bookmarks
        </Link>
      </div>

      <p>
        Made by
        {" "}
        <a href={GITHUB_REPOSITORY} target="_blank" rel="noopener noreferrer" className="underline text-green-3">
          moaqz
        </a>
        {" "}
        with
        {" "}
        <a href="https://appwrite.io" target="_blank" rel="noopener noreferrer" className="underline text-red-3">
          Appwrite
        </a>
      </p>
    </footer>
  );
}
