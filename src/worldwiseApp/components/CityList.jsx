
import { useCities } from '../context/CitiesProvider';
import CityItem from './CityItem';
import Message from './../../Message';
import Spinner from './../../Spinner';
import styles from './CityList.module.css';

function CityList() {
    const {cities, isLoading} = useCities();
    if(!cities.length) return <Message message='Start by clicking on a city on the map'/>
    if(isLoading) return <Spinner/>

    return <ul className={styles.citylist}>
        {cities.map(city => (
            <CityItem city={city} key={city.id}/>
        ))}
    </ul>
}

export default CityList;