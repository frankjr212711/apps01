import NextButton from "../../NextButton";
import PagesNav from "../components/PagesNav";
import styles from "./Pricing.module.css";

function Pricing() {
  return <div className={styles.pricing}>
    <PagesNav/>
    <section>

    <h1>Pricing</h1>

    <NextButton/>
    </section>
  </div>;
}

export default Pricing;
