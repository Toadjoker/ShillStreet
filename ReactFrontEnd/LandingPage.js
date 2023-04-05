// LandingPage.js
import React, { useState } from 'react';
import gif from './gif2.gif';
import poop from './poop.png';
import './styles.css';

function LandingPage() {
  document.title = "ShillStreet";
  const [email, setEmail] = useState('');
  const [poopVisible, setPoopVisible] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePoopButtonClick = () => {
    setPoopVisible(true);
    setTimeout(() => {
        setPoopVisible(false)
    }, 5000)
  }

  return (
    <div>
      <div id="background-wrap">
        <div className="x1">
          <div className="cloud"></div>
        </div>

        <div className="x2">
          <div className="cloud"></div>
        </div>

        <div className="x3">
          <div className="cloud"></div>
        </div>

        <div className="x4">
          <div className="cloud"></div>
        </div>

        <div className="x5">
          <div className="cloud"></div>
        </div>
      </div>
      <div className="gif-container">
        <img src={gif} alt="GIF" className="gif" />
        {poopVisible && <img src={poop} alt="Poop" className="poop" />}
        <button className="poop-button" onClick={handlePoopButtonClick}>
          Don't click me
        </button>
        <form onSubmit={handleSubmit} className="email-form">
          <label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Provide email for private beta"
              className="email-input"
            />
          </label>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
