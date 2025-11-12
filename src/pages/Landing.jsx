import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const containerStyle = {
    fontSize: '15px',
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const logoStyle = {
    width: '100%',
    maxWidth: '250px',
    height: 'auto',
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    lineHeight: '1.5',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const buttonStyle = {
    background: 'black',
    color: 'white',
    border: '3px solid black',
    transition: 'background 1s linear 0ms, color 500ms linear 0ms',
    width: '100%',
    maxWidth: '400px',
    padding: '16px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '10px',
    fontSize: '0.8rem',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://res.cloudinary.com/diogvlobw/image/upload/v1762062126/Logo_SRSIK_Horizontal-x_vehgyz.png"
        alt="Logo SRSIK"
        style={logoStyle}
      />
      <h1 style={headingStyle}>Mulai Skripsi Lebih Mudah</h1>
      <p style={paragraphStyle}>
        Bangun skripsi yang lebih terarah dengan rekomendasi cerdas dari SRSIK Hub. <br />
        Masuk atau daftar untuk memulai perjalanan akademik Anda.
      </p>
      <Link to="/login" style={buttonStyle}>Login</Link>
      <Link to="/register" style={buttonStyle}>Register</Link>
    </div>
  );
};

export default Landing;
