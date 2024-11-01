import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from "./AppLayout.module.css"
import Map from '../components/Map';
import User from '../components/User';
import PageNav from '../components/PageNav';

function AppLayout(props) {
  return (
    <>
    <PageNav />
      <User />
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
    </>
  );
}

export default AppLayout;