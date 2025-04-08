
import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles.spinner}></div>
      <h6>...LOADING</h6>
    </div>
  );
}

export default Spinner;
