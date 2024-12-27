import React from 'react';
import logo from './assets/ben-10.svg';
import './homepage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <img className="logo" src={logo} alt="Ben 10 Logo" />
      
      <Link to="/game">
        <button className="button">Play</button>
      </Link>
      
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <button className="button">GitHub</button>
      </a>
    </>
  );
}

export default HomePage;
