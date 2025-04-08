import { Outlet } from 'react-router-dom';
import AppNav from '../components/AppNav';
import styles from './AppPage.module.css';

function AppPage() {
    return <div className={styles['app-page']}>
        <AppNav/>
        <main>
        <h1>App Page</h1>
        <Outlet/>
        </main>
     

    </div>
}

export default AppPage;