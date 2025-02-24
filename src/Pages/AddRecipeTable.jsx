    import React, { useState } from "react";
    import "../Styles/AddRecipeTable.css"; // Import CSS for styling

    const AddRecipeTable = () => {
    const [recipes, setRecipes] = useState([
        { id: 1, name: "Spaghetti Carbonara", ingredients: "Pasta, Eggs, Cheese, Bacon", category: "Italian", image: "https://source.unsplash.com/100x100/?spaghetti" },
        { id: 2, name: "Chicken Curry", ingredients: "Chicken, Spices, Coconut Milk", category: "Indian", image: "https://source.unsplash.com/100x100/?curry" },
        { id: 3, name: "Sushi", ingredients: "Rice, Fish, Seaweed", category: "Japanese", image: "https://source.unsplash.com/100x100/?sushi" },
    ]);

    const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "", category: "", image: "" });

    // Handle input changes
    const handleInputChange = (e) => {
        setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
    };

    // Add new recipe
    const handleAddRecipe = () => {
        if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.category || !newRecipe.image) {
        alert("Please fill in all fields");
        return;
        }

        setRecipes([...recipes, { id: recipes.length + 1, ...newRecipe }]);
        setNewRecipe({ name: "", ingredients: "", category: "", image: "" }); // Reset input fields
    };

    // Delete a recipe
    const handleDelete = (recipeId) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    };

    return (
        <div className="recipe-table-container">
        <h1 className="table-title">🍽️ Recipe Management</h1>
        <h2>Add & Manage Recipes</h2>

        {/* Input Form */}
        <div className="recipe-form">
            <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="ingredients"
            placeholder="Ingredients (comma-separated)"
            value={newRecipe.ingredients}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="category"
            placeholder="Category"
            value={newRecipe.category}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newRecipe.image}
            onChange={handleInputChange}
            />
            <button className="add-button" onClick={handleAddRecipe}>Add Recipe</button>
        </div>

        {/* Recipe Table */}
        <div className="table-responsive">
            <table className="recipe-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Category</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {recipes.length > 0 ? (
                recipes.map((recipe) => (
                    <tr key={recipe.id}>
                    <td>{recipe.id}</td>
                    <td><img src={recipe.image} alt={recipe.name} className="recipe-image" /></td>
                    <td>{recipe.name}</td>
                    <td>{recipe.ingredients}</td>
                    <td>{recipe.category}</td>
                    <td>
                        <button className="edit-button">Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(recipe.id)}>
                        Delete
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="6">No recipes found.</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
    };

    export default AddRecipeTable;
