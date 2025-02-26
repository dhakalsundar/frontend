import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/AddRecipeTable.css";

const API_URL = "http://localhost:5000/recipe";

const AddRecipeTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    category: "",
    description: [""], // Store description as an array
    image: null,
  });
  const [editRecipe, setEditRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-all-recipe`);
      console.log(response)
      const sortedRecipes = response.data.sort((a, b) => a.id - b.id);
      setRecipes(sortedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleInputChange = (e, index = null) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setNewRecipe((prevRecipe) => ({ ...prevRecipe, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else if (e.target.name === "description") {
      const updatedDescription = [...newRecipe.description];
      updatedDescription[index] = e.target.value;
      setNewRecipe((prevRecipe) => ({ ...prevRecipe, description: updatedDescription }));
    } else {
      setNewRecipe((prevRecipe) => ({ ...prevRecipe, [e.target.name]: e.target.value }));
    }
  };

  const addDescriptionStep = () => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      description: [...prevRecipe.description, ""],
    }));
  };

  const removeDescriptionStep = (index) => {
    if (newRecipe.description.length > 1) {
      const updatedDescription = [...newRecipe.description];
      updatedDescription.splice(index, 1);
      setNewRecipe((prevRecipe) => ({ ...prevRecipe, description: updatedDescription }));
    }
  };

  const openModal = (recipe = null) => {
    if (recipe) {
      setEditRecipe(recipe);
      setNewRecipe({
        name: recipe.name,
        ingredients: recipe.ingredients,
        category: recipe.category,
        description: Array.isArray(recipe.description) ? recipe.description : JSON.parse(recipe.description),
        image: null,
      });
      setImagePreview(recipe.image);
    } else {
      setEditRecipe(null);
      setNewRecipe({ name: "", ingredients: "", category: "", description: [""], image: null });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditRecipe(null);
    setNewRecipe({ name: "", ingredients: "", category: "", description: [""], image: null });
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.category || newRecipe.description.some((step) => step.trim() === "")) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newRecipe.name);
      formData.append("ingredients", newRecipe.ingredients);
      formData.append("category", newRecipe.category);
      formData.append("description", JSON.stringify(newRecipe.description)); // Convert to JSON string

      if (newRecipe.image) {
        formData.append("image", newRecipe.image);
      }

      if (editRecipe) {
        await axios.put(`${API_URL}/update-recipe/${editRecipe.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/add-recipe`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      closeModal();
      fetchRecipes();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  return (
    <div className="recipe-table-container">
      <h1 className="table-title">🍽️ Recipe Management</h1>
      <h2>Add & Manage Recipes</h2>

      <button className="add-button" onClick={() => openModal()}>➕ Add Recipe</button>

      <div className="table-responsive">
        <table className="recipe-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Category</th>
              <th>Actions</th> {/* Removed Description Column */}
            </tr>
          </thead>
          <tbody>
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.id}</td>
                  <td>
                    {recipe.image ? (
                      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{recipe.name}</td>
                  <td>{recipe.ingredients}</td>
                  <td>{recipe.category}</td>
                  <td>
                    <button className="edit-button" onClick={() => openModal(recipe)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(recipe.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No recipes found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>✖</button>
            <h2>{editRecipe ? "Edit Recipe" : "Add Recipe"}</h2>

            <input type="text" className="overlay-input" name="name" placeholder="Recipe Name" value={newRecipe.name} onChange={handleInputChange} />
            <input type="text" name="ingredients" className="overlay-input" placeholder="Ingredients" value={newRecipe.ingredients} onChange={handleInputChange} />
            <input type="text" name="category" className="overlay-input" placeholder="Category" value={newRecipe.category} onChange={handleInputChange} />

            <h3>Steps</h3>
            {newRecipe.description.map((step, index) => (
              <div key={index} className="description-step">
                <input
                  type="text"
                  className="overlay-input"
                  placeholder={`Step ${index + 1}`}
                  name="description"
                  value={step}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <button className="remove-step" onClick={() => removeDescriptionStep(index)}>❌</button>
              </div>
            ))}
            <button className="add-step" onClick={addDescriptionStep}>➕ Add Step</button>

            <input type="file" name="image" className="overlay-input" accept="image/*" onChange={handleInputChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

            <button className="save-button" onClick={handleSubmit}>{editRecipe ? "Update" : "Add"} Recipe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipeTable;
