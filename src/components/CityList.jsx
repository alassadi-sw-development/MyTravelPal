import React from 'react';
import Spinner from "./Spinner";
import CityItem from './CityItem';
import Message from "./Message";
import styles from './CityList.module.css'
import { useCities } from "../contexts/CitiesContext"

function CityList() {
  const {cities, isLoading} = useCities();

  if (isLoading) {
    return <Spinner />;
  } else if(!cities.length){return <Message message="Add your first city by clicking on a city on the map"/>} else {
    return (
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    );
  }
}


export default CityList;
