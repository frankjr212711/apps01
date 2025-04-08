import { NavLink } from "react-router-dom";
import styles from './PagesNav.module.css'
import Logo from "./Logo";

function PagesNav() {
  return (
    <nav className={styles.pagesNav}>
      <div className={styles["nav-container"]}>
      <Logo />
      <ul className={styles["nav-list"]}>
        <li className={styles["nav-item"]}>
          <NavLink to="/pricing" className={styles["nav-cta"]}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/products" className={styles["nav-cta"]}>Products</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles["nav-cta"]}>Login</NavLink>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default PagesNav;
