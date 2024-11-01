import styles from './CitySelector.module.css';

function CitySelector({ selectedCity, cities, handleCityChange }) {

  return (
    <section>
      <label htmlFor="city-select" className={styles.label}>Select Departure City: </label>
      <select id="city-select" className={styles.select} onChange={handleCityChange} value={selectedCity}>
        <option value="" className={styles.option}>--Choose a city--</option>
        {cities.map((city) => (
          <option key={city} value={city} className={styles.option}>
            {city}
          </option>
        ))}
      </select>
    </section>
  );
}

export default CitySelector;
