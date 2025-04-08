import { useCities } from "../context/CitiesProvider";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

function CityItem({ city }) {
  const { deleteCity, formatDate } = useCities();
  // const { city: cityName, id, emoji, date, position } = city;
  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${styles.cityItem} `}
      >
        <span>{city.emoji} </span>
        <h4>{city.city}</h4>
        <span className={styles.date}> {formatDate(city.date)}</span>
        <span
          className={styles.delBtn}
          onClick={(e) => {
            e.preventDefault();
            deleteCity(city.id);
          }}
        >
          &times;
        </span>
      </Link>
    </li>
  );
}

export default CityItem;
