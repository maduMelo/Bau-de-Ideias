import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div id='home-page'>
            <h1>Home Page</h1>
            <Link to="/register">• Register</Link>
            <br />
            <Link to="/login">• Login</Link>
        </div>
    );
};

export default LandingPage;