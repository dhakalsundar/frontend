import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';


function HomePage() {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1>Welcome to <span>AI Recipe Chat</span></h1>
        <p>Your personal AI-powered assistant for delicious recipes!</p>
        
        <Link to="/recipe" className="btn-explore">Explore Recipes</Link>
      </div>
    </div>
  );
}

export default HomePage;
