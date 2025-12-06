import React from 'react';
import logo from './assets/ben-10.svg';
import './homepage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <img className="logo" src={logo} alt="Ben 10 Logo" />

      <div className="button-container">
        <Link to="/game">
          <button className="primary-button">Play</button>
        </Link>

        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <button className="primary-button">GitHub</button>
        </a>
      </div>
    </div>
  );
}

export default HomePage;
