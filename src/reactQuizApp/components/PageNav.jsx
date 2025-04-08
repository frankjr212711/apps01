import { NavLink } from "react-router-dom";
import styles from './PageNav.module.css';


function PageNav() {
    return <nav className={styles['page-nav']}>
        <ul>
            <NavLink to='/app' className={styles.cta} >
            <span>👨🏾‍💻</span>
            Access App
            </NavLink>
        </ul>
    </nav>
}

export default PageNav;