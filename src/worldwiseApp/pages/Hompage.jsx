import { Link } from "react-router-dom";
import PagesNav from "../components/PagesNav";
import Button from "./../../Button";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <PagesNav />
      <section>
        <h1>Homepage</h1>
        <Link to="/login" className="cta home-cta">
          start tracking
        </Link>
        <Button type="primary">Start track</Button>
      </section>
    </div>
  );
}

export default Homepage;
