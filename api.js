import axios from 'axios';

const API_KEY = 'YOUR_SPOONACULAR_API_KEY';

export const fetchRecipes = async (ingredients) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
  );
  return response.data;
};