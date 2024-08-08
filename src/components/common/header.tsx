import { Link } from "react-router-dom";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={`${styles.header} container`}>
      <Link to="/" className={styles.logo}>bmarks</Link>
    </header>
  );
}
