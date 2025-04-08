import { NavLink } from "react-router-dom";
import styles from './AppNav.module.css';

function AppNav() {
    return <nav className={styles.appNav}>
        <ul className={styles["nav-container"]}>
            <li>
                <NavLink to='cities' className={styles["nav-cta"]}>Cities</NavLink>
            </li>
            <li>
                <NavLink to='countries' className={styles["nav-cta"]}>Countries</NavLink>
            </li>
        </ul>
    </nav>
}
export default AppNav;