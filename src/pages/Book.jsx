import { useEffect, useState } from "react";
import axios from "axios";
import PageNav from "../components/PageNav";
import CitySelector from "../components/CitySelector";
import TripTable from "../components/TripTable";
import BookedTripsTable from "../components/BookedTripsTable";
import styles from "./Book.module.css"
import User from "../components/User"

const BASE_URL = "http://localhost:8082";

function Book() {
  const [trips, setTrips] = useState({});
  const [bookedTrips, setBookedTrips] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [tripDates, setTripDates] = useState({});
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripsActive, setTripsActive] = useState(true);
  const [bookedActive, setBookedActive] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/trips`)
      .then((res) => {
        setTrips(res.data);
        console.log("Fetched trips:", res.data); // Debugging log
      })
      .catch((err) => {
        console.log("Error fetching trips:", err.response.statusText);
      });
  }, [tripsActive]);

  useEffect(() => {
    axios.get(`${BASE_URL}/booked`)
      .then((res) => {
        setBookedTrips(res.data);
      })
      .catch((err) => {
        console.log("Error fetching booked:", err.response.statusText);
      });
  }, [bookedActive]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDepartureDateChange = (date, tripId) => {
    const updatedTripDates = {
      ...tripDates,
      [tripId]: {
        ...tripDates[tripId],
        departureDate: date,
      },
    };
    setTripDates(updatedTripDates);
  };

  const handleReturnDateChange = (date, tripId) => {
    const updatedTripDates = {
      ...tripDates,
      [tripId]: {
        ...tripDates[tripId],
        returnDate: date,
      },
    };
    setTripDates(updatedTripDates);
  };

  const calculateTripDuration = (departureDate, returnDate) => {
    if (!departureDate || !returnDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const departure = new Date(departureDate);
    const returnDt = new Date(returnDate);

    return Math.round(Math.abs((departure - returnDt) / oneDay));
  };

  const handleBuyTrip = (trip) => {
    const totalCost = Number(trip.price) + (calculateTripDuration(tripDates[trip.id]?.departureDate, tripDates[trip.id]?.returnDate) * parseInt(trip.accommodation));

    const confirmMessage = `Are you sure you want to buy this trip for ${totalCost}€?`;
    const userConfirmed = window.confirm(confirmMessage);

    if (!userConfirmed) {
      alert('Please confirm your payment to book this trip');
      return;
    }

    const tripData = {
      departureCity: selectedCity,
      destination: trip.destination,
      departureDate: tripDates[trip.id]?.departureDate,
      returnDate: tripDates[trip.id]?.returnDate,
      price: trip.price,
      lat : trip.lat,
      lng : trip.lng,
      durationDays: calculateTripDuration(tripDates[trip.id]?.departureDate, tripDates[trip.id]?.returnDate),
      accommodationFee: calculateTripDuration(tripDates[trip.id]?.departureDate, tripDates[trip.id]?.returnDate) * parseInt(trip.accommodation),
      totalCost: totalCost
    };

    axios.post(`${BASE_URL}/booked`, tripData)
      .then(response => {
        console.log('Trip booked successfully:', response.data);
        setSelectedTrip(tripData);
        setBookedActive(true);
        setTripsActive(false);
      })
      .catch(error => {
        console.error('Error booking trip:', error);
      });
  };

  const handleDeleteTrip = (tripId) => {
    const tripToDelete = bookedTrips.find(trip => trip.id === tripId);
    if (!tripToDelete) {
      alert('Trip not found');
      return;
    }

    const today = new Date();
    const departureDate = new Date(tripToDelete.departureDate);

    if (departureDate <= today) {
      alert('Cannot cancel trips that have already started or finished.');
      return;
    }

    axios.delete(`${BASE_URL}/booked/${tripId}`)
      .then(response => {
        console.log('Trip deleted successfully:', response.data);
        setBookedTrips(bookedTrips.filter(trip => trip.id !== tripId));
      })
      .catch(error => {
        console.error('Error deleting trip:', error);
      });
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-EN", options);
  }

  const isFutureDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date > today;
  };

  return (
    <main>
      <PageNav />
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            setTripsActive(true);
            setBookedActive(false);
          }}
          className={`${styles.toggleButton} ${tripsActive ? styles.activeButton : ''}`}
        >
          Trip
        </button>
        <button
          onClick={() => {
            setTripsActive(false);
            setBookedActive(true);
          }}
          className={`${styles.toggleButton} ${bookedActive ? styles.activeButton : ''}`}
        >
          Booked
        </button>
      </div>
      <User/>
      {tripsActive && <>
        <CitySelector
          selectedCity={selectedCity}
          cities={Object.keys(trips)}
          handleCityChange={handleCityChange}
        />

        {selectedCity && trips[selectedCity] && (
          <TripTable
            selectedCity={selectedCity}
            trips={trips[selectedCity]}
            tripDates={tripDates}
            handleDepartureDateChange={handleDepartureDateChange}
            handleReturnDateChange={handleReturnDateChange}
            handleBuyTrip={handleBuyTrip}
            calculateTripDuration={calculateTripDuration}
          />
        )}
      </>}

      {bookedActive && <>
        <BookedTripsTable
          bookedTrips={bookedTrips}
          handleDeleteTrip={handleDeleteTrip}
          formatDate={formatDate}
          isFutureDate={isFutureDate}
        />
      </>}
    </main>
  );
}

export default Book;
