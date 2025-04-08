import PagesNav from "../components/PagesNav";
import styles from "./Products.module.css";

function Products() {
  return (
    <div className={styles.products}>
      <PagesNav />
      <section>
        <h1 >Products</h1>
      </section>
    </div>
  );
}

export default Products;
