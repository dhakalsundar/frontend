import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=YOUR_API_KEY`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>AI Recipe Generator</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={fetchRecipes}>Generate Recipes</button>
      </div>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;