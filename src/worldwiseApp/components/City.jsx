import { Link, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../context/CitiesProvider";
import { useEffect } from "react";
import Button from "../../Button";
import BackButton from "../../BackButton";

function City() {
  const { id } = useParams();
  const { getCity, currentCity, formatDate } = useCities();
  const { city,country, date, notes } = currentCity;
  useEffect(() => {
    getCity(id);
  }, [id]);

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>CITY NAME</h6>
        <h4>{city}, {country}</h4>
      </div>
      <div className={styles.row}>
        <h6>DATE VISITED </h6>
        <h4>{date}</h4>
      </div>
      <div className={styles.row}>
        <h6>NOTES </h6>
        <h4>{notes}</h4>
      </div>
      <div className={styles.row}>
        <h6>READ MORE </h6>
        <Link to="">Check out more on {city} on Wikipedia &rarr;</Link>
      </div>
      <div className={styles.btnRow}>
        <BackButton type="primary"/>
      
      </div>
    </div>
  );
}

export default City;
