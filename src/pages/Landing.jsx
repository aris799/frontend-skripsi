import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landingMain}>
      <img 
        src="https://res.cloudinary.com/diogvlobw/image/upload/v1762062126/Logo_SRSIK_Horizontal-x_vehgyz.png" 
        alt="Logo SRSIK" 
        className={styles.landingLogo}
      />
      <h1 className={styles.landingTitle}>Mulai Skripsi Lebih Mudah</h1>
      <p className={styles.landingDescription}>
        Bangun skripsi yang lebih terarah dengan rekomendasi cerdas dari SRSIK Hub. <br /> 
        Masuk atau daftar untuk memulai perjalanan akademik Anda.
      </p>
      <Link 
        to="/login" 
        className={styles.landingButton}
      >
        Login
      </Link>
      <Link 
        to="/register" 
        className={styles.landingButton}
      >
        Register
      </Link>
    </div>
  );
}

export default Landing;
