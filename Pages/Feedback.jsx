import React, { useState } from "react";
import '../Styles/Feedback.css'; 

const FeedbackTable = () => {
  const categories = [
    "User Interface (UI)",
    "User Experience (UX)",
    "AI Recipe Suggestions",
    "Search Functionality",
    "Customization Options",
    "Performance & Speed",
    "Ingredient Substitutions",
    "Dietary Preferences Support",
    "Errors & Bugs",
    "Other Suggestions",
  ];

  const [feedbackData, setFeedbackData] = useState(
    categories.map((category) => ({
      category,
      feedback: "",
      rating: 0,
      experience: "Good",
    }))
  );

  const handleInputChange = (index, field, value) => {
    const newFeedbackData = [...feedbackData];
    newFeedbackData[index][field] = value;
    setFeedbackData(newFeedbackData);
  };

  const handleSubmit = () => {
    console.log("Submitted Feedback:", feedbackData);
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">AI Recipe Generator Feedback</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Feedback</th>
              <th className="py-2 px-4 text-left">Star Rating</th>
              <th className="py-2 px-4 text-left">Experience</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    placeholder="Enter feedback"
                    value={item.feedback}
                    onChange={(e) => handleInputChange(index, "feedback", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </td>
                <td className="py-2 px-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-xl ${
                        star <= item.rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                      onClick={() => handleInputChange(index, "rating", star)}
                    >
                      ★
                    </span>
                  ))}
                </td>
                <td className="py-2 px-4">
                  <select
                    value={item.experience}
                    onChange={(e) => handleInputChange(index, "experience", e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Good">Good</option>
                    <option value="Bad">Bad</option>
                    <option value="Excellent">Excellent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackTable;
