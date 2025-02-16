import React from 'react';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>Missing Ingredients: {recipe.missedIngredientCount}</p>
    </div>
  );
};

export default RecipeCard;