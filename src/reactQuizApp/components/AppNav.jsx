import { Link, NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import { useState } from "react";

function AppNav() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <nav
        className={`${styles["page-nav"]} ${isActive ? styles["open"] : ""}`}
      >
        <Menu isActive={isActive} setIsActive={setIsActive} />
        <MenuList isActive={isActive} />
        <div className={styles["menu-list"]}>
          <ul>
            <li>
              <Link to="/" className={styles.cta}>
                <span className={styles.icon}>🏠</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

function MenuList({ isActive }) {
  return (
    <div className={styles["menu-list"]}>
      <ul>
        <li>
          <Link to="calls" className={styles.cta}>
            <span className={styles.icon}>📞</span>
            {isActive && <span className={styles.txt}>Calls</span>}
          </Link>
        </li>
        <li>
          <Link to="chats" className={styles.cta}>
            <span className={styles.icon}>💬 </span>
            {isActive && <span className={styles.txt}>Chats</span>}
          </Link>
        </li>
        <li>
          <Link to="status" className={styles.cta}>
            <span className={styles.icon}>💫</span>
            {isActive && <span className={styles.txt}>Status</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Menu({ setIsActive }) {
  function handleClick(e) {
    setIsActive((active) => !active);
  }
  return (
    <div className={`${styles.menu}`} onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default AppNav;
