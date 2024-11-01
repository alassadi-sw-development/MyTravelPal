import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import styles from './TripTable.module.css';

function TripTable({ trips, tripDates, handleDepartureDateChange, handleReturnDateChange, handleBuyTrip, calculateTripDuration, selectedCity }) {
  return (
    <section>
      <span className={styles.selectedCity}>{selectedCity}</span>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Destination</th>
            <th>Departure & Return Dates</th>
            <th>Round-Trip Price</th>
            <th>Duration (days)</th>
            <th>Accommodation fee (€)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{selectedCity}</td>
              <td>{trip.destination}</td>
              <td className={styles.datePickerContainer}>
                <DatePicker
                  selected={tripDates[trip.id]?.departureDate}
                  onChange={(date) => handleDepartureDateChange(date, trip.id)}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                />
              </td>
              <td className={styles.datePickerContainer}>
                <DatePicker
                  selected={tripDates[trip.id]?.returnDate}
                  onChange={(date) => handleReturnDateChange(date, trip.id)}
                  dateFormat="dd/MM/yyyy"
                  className={styles.datePicker}
                />
              </td>
              <td>{trip.price}€</td>
              <td>{calculateTripDuration(tripDates[trip.id]?.departureDate, tripDates[trip.id]?.returnDate)} {calculateTripDuration(tripDates[trip.id]?.departureDate, tripDates[trip.id]?.returnDate) === 1 ? 'Day' : 'Days'}</td>
              <td>{calculateTripDuration(tripDates[trip.id]?.departureDate, tripDates[trip.id]?.returnDate) * parseInt(trip.accommodation)}€</td>
              <td>
                <Link to="#" className={styles.cta} onClick={(e) => { e.preventDefault(); handleBuyTrip(trip); }}>Buy this Trip</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TripTable;
