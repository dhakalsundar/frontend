import React, { useState, useEffect } from "react";
import "../Styles/Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [preferredCuisine, setPreferredCuisine] = useState("Italian");
  const [dietaryPreference, setDietaryPreference] = useState("None");
  const [spicyLevel, setSpicyLevel] = useState(2);

  // Load settings from local storage
  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("recipeSettings"));
    if (storedSettings) {
      setDarkMode(storedSettings.darkMode);
      setPreferredCuisine(storedSettings.preferredCuisine);
      setDietaryPreference(storedSettings.dietaryPreference);
      setSpicyLevel(storedSettings.spicyLevel);
    }
  }, []);

  // Save settings to local storage
  const saveSettings = () => {
    const settings = { darkMode, preferredCuisine, dietaryPreference, spicyLevel };
    localStorage.setItem("recipeSettings", JSON.stringify(settings));
    alert("Settings saved successfully! ✅");
  };

  return (
    <div className={`settings-container ${darkMode ? "dark" : ""}`}>
      <h2>Settings</h2>

      {/* Theme Toggle */}
      <div className="setting-item">
        <label>Dark Mode</label>
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>

      {/* Preferred Cuisine */}
      <div className="setting-item">
        <label>Preferred Cuisine</label>
        <select value={preferredCuisine} onChange={(e) => setPreferredCuisine(e.target.value)}>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Mexican">Mexican</option>
          <option value="French">French</option>
        </select>
      </div>

      {/* Dietary Preferences */}
      <div className="setting-item">
        <label>Dietary Preference</label>
        <select value={dietaryPreference} onChange={(e) => setDietaryPreference(e.target.value)}>
          <option value="None">None</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Keto">Keto</option>
        </select>
      </div>

      {/* Spicy Level */}
      <div className="setting-item">
        <label>Spicy Level</label>
        <input type="range" min="1" max="5" value={spicyLevel} onChange={(e) => setSpicyLevel(e.target.value)} />
        <span>{spicyLevel}</span>
      </div>

      {/* Save Button */}
      <button onClick={saveSettings}>Save Preferences</button>
    </div>
  );
};

export default Settings;
