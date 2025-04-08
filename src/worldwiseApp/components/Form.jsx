import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Button from "./../../Button";
import Spinner from "./../../Spinner";
import Message from "./../../Message";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../context/CitiesProvider";
import { useNavigate } from "react-router-dom";
import BackButton from "../../BackButton";

const REVERSE_GEOCODE =
  "https://api.bigdataCloud.net/data/reverse-geocode-client";

// "https://api.bigdataCloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

function Form() {
  const navigate = useNavigate();
  const { createCity } = useCities();
  const [lat, lng] = useUrlPosition();
  const [city, setCityName] = useState("");
  const [country, setCountryName] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [emoji, setEmoji] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCityData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `${REVERSE_GEOCODE}?latitude=${lat}&longitude=${lng}`
        );

        const data = await res.json();

        if (!data.countryCode)
          throw new Error("That is not valid city, Click on somewhere else");

        setCityName(data.city || data.locality || "");
        setEmoji(data.countryCode);
        setCountryName(data.countryName);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  function handleSubmit(e) {
    e.preventDefault();

    createCity({
      city,
      country,
      date,
      notes,
      emoji,
      position: { lat: Number(lat), lng: Number(lng) },
    });
    navigate("/app");
  }

  if (!lat && !lng)
    return <Message message="Start by clicking on a city on the map &rar;" />;
  if (error) return <Message message={error} />;

  if (isLoading) return <Spinner />;

  return (
    <form action="" className={styles["map-form"]} onSubmit={handleSubmit}>
      <div className={styles["map-form-container"]}>
        <div className={styles.row}>
          <label htmlFor="">City name</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="">
            When did you visit {city} in <strong>{country}</strong>
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="">Your notes on {city}</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className={styles.btnsRow}>
          <Button type='primary'>Add City</Button>
          <BackButton/>
        </div>
      </div>
    </form>
  );
}

export default Form;
