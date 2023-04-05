// Navbar.js
import React from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <h1 className="website-name">SHILLSTREET</h1>
            </div>
            <div className="navbar-right">
                {/* <div className="tab">Advertise</div>
                <div className="tab">How it Works</div>
                <div className="tab">About Us</div> */}
                <a href="https://twitter.com/ShillStreet" target="_blank" rel="noopener noreferrer">
                    <button className="action-button">
                    <FontAwesomeIcon icon={faDove} />
                </button>
                </a>
            </div>
        </div>
    );
}

export default Navbar;
