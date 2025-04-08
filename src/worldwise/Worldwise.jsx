import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Button from "../../Button";
import BackButton from "../../BackButton";
import Message from "../../Message";
import "./Worldwise.css";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

const BASE_URL = "http://localhost:8080";
const REVERSE_GEOCODE =
  "https://api.bigdataCloud.net/data/reverse-geocode-client";

// "https://api.bigdataCloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

function Worldwise() {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function createCity(city) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: { "Context-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
    } finally {
      setIsLoading(true);
    }
  }
  async function deleteCity(id) {
    await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });
    setCities((cities) => cities.filter((city) => city.id !== id));
  }

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  //   console.log(cities);

  return (
    <div className="world-wise">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="app" element={<AppPage cities={cities} />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} deleteCity={deleteCity} />}
            />
            <Route
              path="cities/:id"
              element={<City cities={cities} currentCity={currentCity} getCity={getCity} />}
            />
            <Route path="countries" element={<CountryList cities={cities} />} />
            <Route path="form" element={<Form createCity={createCity} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// components

function PageNav() {
  return (
    <nav className="nav">
      <div className="nav-wrap">
        <Logo />
        <ul>
          <li>
            <NavLink to="/explore" className="cta">
              Explore?
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="cta">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
function AppNav() {
  return (
    <nav className="app-nav">
      <ul>
        <li>
          <NavLink to="cities" className="app-cta">
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink to="countries" className="app-cta">
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <Link to="/" className="logo-cta">
        <span>🛸</span>
        <h2>Savorr</h2>
      </Link>
    </div>
  );
}
function Sidebar() {
  return (
    <div className="sidebar">
      <Logo />
      <AppNav />
      <Outlet />
    </div>
  );
}
function Map({ cities }) {
  const [position, setPosition] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className="map">
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city, idx) => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup key={city.id}>
              <h6>
                <span>{city.emoji}</span>
                {city.cityName}
              </h6>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
function CityList({ cities, deleteCity }) {
  return (
    <ul className="citylist">
      {cities.map((city, idx) => (
        <CityItem city={city} deleteCity={deleteCity} key={idx} />
      ))}
    </ul>
  );
}
function CityItem({ city, deleteCity }) {
  const { id, cityName, date, emoji, position } = city;
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`city-item`}
      >
        <span>{emoji}</span>
        <h5>{cityName}</h5>
        <span>{date}</span>
        <span
          className="delBtn"
          onClick={(e) => {
            e.preventDefault();
            deleteCity(id);
          }}
        >
          &times;
        </span>
      </Link>
    </li>
  );
}
function CountryList({ cities }) {
  return (
    <ul className="countrylist">
      {cities.map((city) => (
        <CountryItem city={city} />
      ))}
    </ul>
  );
}
function CountryItem({ city }) {
  const { id, cityName, date, emoji } = city;
  return (
    <li className="country-item">
      <h5>{cityName}</h5>
    </li>
  );
}
function City({ getCity, currentCity }) {
  const { id } = useParams();
  const {cityName, emoji, date, notes} = currentCity;

  useEffect(() => {
    getCity(id);
  }, [id]);

  return (
    <div className='city'>
      <div className='row'>
        <h6>City name</h6>
        <h3>
          {emoji} {cityName}
        </h3>
      </div>
      <div className='row'>
        <h6>When did you visit {cityName}?</h6>
        <h3>{date}</h3>
      </div>
      <div className='row'>
        <h6>Your notes about {cityName}</h6>
        <h3>{notes}</h3>
      </div>
      <div className='row'>
        <h6>LEARN MORE</h6>
        <Link>Check out {cityName} on Wikipedia &rarr;</Link>
      </div>
      <div className='row'>
        <BackButton type="teal" />
      </div>
    </div>
  );
}
function Form({ createCity }) {
  const [cityName, setCity] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function handleSubmit(e) {
    e.preventDefault();
    createCity({
      cityName,
      countryName,
      date,
      emoji,
      notes,
      position: { lat: Number(lat), lng: Number(lng) },
    });
    navigate("/app");
  }
  
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `${REVERSE_GEOCODE}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        // console.log(data);
        setCity(data.city || data.locality || "");
        setCountryName(data.countryName);
        setEmoji(data.countryCode);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-wrap">
        <div className="row">
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            type="text"
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="date">
            When did you visit {cityName}, <strong>{countryName}</strong>
          </label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="row">
          <label htmlFor="notes">Your notes about {cityName}</label>
          <textarea
            name=""
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="btnsRow">
          <Button>Add city</Button>
          <BackButton />
        </div>
      </div>
    </form>
  );
}

// pages
function Homepage() {
  return (
    <div className="home">
      <PageNav />
      <section>
        <h1>Homepage</h1>
        <Link to="/login">Start tracking</Link>
      </section>
    </div>
  );
}
function LoginPage() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    navigate("/app");
  }
  return (
    <div className="login">
      <PageNav />

      <section>
        <h1>Login page</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <div className="form-wrap">
            <header>
              <h1>Login page</h1>
            </header>
            <div className="row">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="" />
            </div>
            <div className="row">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="" />
            </div>
          </div>
          <div className="row">
            <Button type="teal">Login</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
function ExplorePage() {
  return (
    <div className="explore">
      <PageNav />
      <section>
        <h1>Explore page</h1>
      </section>
    </div>
  );
}
function AppPage({ cities }) {
  return (
    <div className="app-page">
      <Sidebar />
      <Map cities={cities} />
    </div>
  );
}

export default Worldwise;
