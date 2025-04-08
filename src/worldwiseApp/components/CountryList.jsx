import { useCities } from "../context/CitiesProvider";
import styles from "./CountryList.module.css";
import Message from './../../Message';
import CountryItem from "./CountryItem";

function CountryList() {
  const { cities } = useCities();
  if (!cities.length)
    return <Message message="Add country by clicking on city on the map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countrylist}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
export default CountryList;
