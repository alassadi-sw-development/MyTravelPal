import PageNav from '../components/PageNav';
import { Link } from 'react-router-dom';
import styles from "./Homepage.module.css"

function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      
      <section>
      <h1>
        Explore the globe.
        <br />
        MyTravelPal captures your journeys.
      </h1>
      <h2>
        An interactive map that logs your visits to every city imaginable. Cherish your amazing experiences and share your global adventures with friends.
      </h2>

        <Link to="/app" className="cta">Log Your Visits Now</Link>
      </section>
    </main>
  );
}

export default Homepage;