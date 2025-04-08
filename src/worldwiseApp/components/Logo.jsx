import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles["logo-wrap"]}>
        <Link to="/" className={styles["logo-cta"]}>
          <span>🛸</span>
          <h1>Jet</h1>
        </Link>
      </div>
    </div>
  );
}

export default Logo;
