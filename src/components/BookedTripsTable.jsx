import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BookedTripsTable.module.css';

function BookedTripsTable({ bookedTrips, handleDeleteTrip, formatDate, isFutureDate }) {
  return (
    <section>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Departuring From</th>
            <th>Date</th>
            <th>Traveling To</th>
            <th>Returning Date</th>
            <th>Trip Duration</th>
            <th>Total Cost</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookedTrips.map((bookedTrip) => (
            <tr key={bookedTrip.id}>
              <td>{bookedTrip.departureCity}</td>
              <td>{formatDate(bookedTrip.departureDate)}</td>
              <td>{bookedTrip.destination}</td>
              <td>{formatDate(bookedTrip.returnDate)}</td>
              <td>{bookedTrip.durationDays} {bookedTrip.durationDays === 1 ? 'Day' : 'Days'}</td>
              <td>{bookedTrip.totalCost}€</td>
              <td>
                <Link to="#" className={styles.cta} onClick={(e) => { e.preventDefault(); handleDeleteTrip(bookedTrip.id); }} style={{ pointerEvents: isFutureDate(bookedTrip.departureDate) ? 'auto' : 'none', opacity: isFutureDate(bookedTrip.departureDate) ? 1 : 0.5 }}>Cancel Trip</Link>
              </td>
              <td>
                <Link to={`/app/form?lat=${bookedTrip.lat}&lng=${bookedTrip.lng}`} className={styles.cta1}>Add to Map</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default BookedTripsTable;
