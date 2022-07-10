import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/landingPage">LandingPage</Link>
            <Link to="/galleryGame">GalleryGame</Link>
        </nav>
    );
};

export default NavBar;
