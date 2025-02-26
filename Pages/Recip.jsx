import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Recip.css"; // Import styles

const API_URL = "http://localhost:5000/recipe/get-all-recipe"; // Backend API
const AI_API_URL = "http://localhost:5000/api/content/generate-content"; // AI API

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]); // Store recipes
  const [search, setSearch] = useState(""); // Store search input
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Store selected recipe
  const [aiRecipe, setAiRecipe] = useState(null); // Store AI-generated recipe
  const [loading, setLoading] = useState(false); // Loading state for AI request

  // Fetch recipes from API when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle AI Recipe Search
  const handleSearchWeb = async () => {
    if (!search.trim()) return; // Prevent empty search

    setLoading(true);
    setAiRecipe(null); // Reset AI recipe

    try {
      const response = await axios.post(AI_API_URL, {
        prompt: `Give me the recipe of ${search}`,
      });

      console.log("AI Recipe:", response.data);
      setAiRecipe(response.data.generatedContent); // Store AI-generated recipe content
    } catch (error) {
      console.error("Error fetching AI recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explore-container">
      <h1>Explore Recipes</h1>

      {/* Search Container - Always Visible */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button className="search-web-button" onClick={handleSearchWeb}>
          {loading ? "Searching..." : "Search Web"}
        </button>
      </div>

      {/* Details Container - Changes Dynamically */}
      <div className="details-container">
        {aiRecipe ? (
          // AI Recipe Section
          <div className="ai-recipe-container">
            <h2>AI Generated Recipe</h2>
            <button className="close-ai-recipe" onClick={() => setAiRecipe(null)}>
              Clear AI Recipe
            </button>
            <div className="ai-recipe-content">
              {aiRecipe
                ?.split("\n")
                .filter(
                  (line) =>
                    line.trim() !== "" &&
                    !line.includes("Tips and Variations:") // Remove empty lines & extra sections
                )
                .map((line, index) => {
                  if (line.startsWith("**")) {
                    return (
                      <h3 key={index}>{line.replace(/\*\*/g, "").trim()}</h3>
                    ); // Convert bold text to section headers
                  } else if (line.startsWith("*")) {
                    return <li key={index}>{line.replace("*", "").trim()}</li>; // Convert *bullets* into list items
                  } else {
                    return <p key={index}>{line.trim()}</p>; // Normal text remains as paragraphs
                  }
                })}
            </div>
          </div>
        ) : (
          // Recipe Grid Section
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <img
                    src={recipe.image ? recipe.image : "/placeholder.jpg"} // Fallback image
                    alt={recipe.name}
                    className="recipe-image"
                  />
                  <h3>{recipe.name}</h3>
                  <button className="view-button">View Recipe</button>
                </div>
              ))
            ) : (
              <p className="no-results">No recipes found.</p>
            )}
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="modal-container show">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedRecipe(null)}>
              X
            </button>
            <h2>{selectedRecipe.name}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} className="recipe-image" />

            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients
                ?.split(",")
                .map((ingredient, index) => <li key={index}>{ingredient.trim()}</li>)}
            </ul>

            <h3>Instructions</h3>
            <ul>
              {selectedRecipe.description
                ?.replace(/^\[|\]$/g, "") // Remove starting & ending brackets
                .replace(/"/g, "") // Remove quotes
                .split(",") // Split steps by commas
                .map((step, index) => <li key={index}>{step.trim()}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreRecipes;
