import React, { useState } from "react";
import "./styles.css"; // Assuming the styles are in styles.css

// Component to handle the assignment configuration form
const AssignmentConfigForm = ({ onSubmit }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    Title: "",
    TimeLimit: "",
    Type: "", // Only accepts "Quiz" or "Assignment"
    Max_score: "",
    Due_date: "",
    Active_YN: false,
    TotalQuestions: 0,
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Sends formData object to parent component
  };

  return (
    <form className="form-content" onSubmit={handleSubmit}>
      {/* Title input field */}
      <div className="form-group">
        <label htmlFor="Title">Title</label>
        <input
          name="Title"
          type="text"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </div>

      {/* Time Limit input field */}
      <div className="form-group">
        <label htmlFor="TimeLimit">Time Limit</label>
        <input
          name="TimeLimit"
          type="text"
          value={formData.TimeLimit}
          onChange={handleChange}
          placeholder="Time Limit"
          required
        />
      </div>

      {/* Type select dropdown */}
      <div className="form-group">
        <label>Type</label>
        <div className="custom-select">
          <select
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Quiz">Quiz</option>
            <option value="Assignment">Assignment</option>
          </select>
        </div>
      </div>

      {/* Max Score input field */}
      <div className="form-group">
        <label htmlFor="Max_score">Max Score</label>
        <input
          name="Max_score"
          type="number"
          value={formData.Max_score}
          onChange={handleChange}
          placeholder="Max Score"
          required
        />
      </div>

      {/* Due Date input field */}
      <div className="form-group">
        <label htmlFor="Due_date">Due Date</label>
        <input
          name="Due_date"
          type="date"
          value={formData.Due_date}
          onChange={handleChange}
          placeholder="Due Date"
          required
        />
      </div>

      {/* Active checkbox */}
      <div className="checkbox-group">
        <label htmlFor="Active_YN">Active</label>
        <input
          name="Active_YN"
          type="checkbox"
          checked={formData.Active_YN}
          onChange={handleChange}
        />
      </div>

      {/* Total Questions input field */}
      <div className="form-group">
        <label htmlFor="TotalQuestions">Total Questions</label>
        <input
          name="TotalQuestions"
          type="number"
          value={formData.TotalQuestions}
          onChange={handleChange}
          placeholder="Total Questions"
          required
        />
      </div>

      {/* Submit button */}
      <button className="upload" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AssignmentConfigForm;
