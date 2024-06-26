import React, { useState, useEffect } from "react";
import "./styles.css"; // Assuming the styles are in styles.css

const AssignmentConfigTopicsForm = ({
  assignmentConfigData, // Data from the assignment configuration form
  onSubmitTopics, // Function to handle the form submission
  availableTopics, // List of available topics to choose from
}) => {
  // State to hold the list of topics
  const [topics, setTopics] = useState([]);
  // State to hold the total number of questions across all topics
  const [totalQuestions, setTotalQuestions] = useState(0);
  // State to hold any error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Effect to update the total number of questions whenever topics change
  useEffect(() => {
    const total = topics.reduce(
      (acc, topic) => acc + parseInt(topic.NumberOfQuestions || 0),
      0
    );
    setTotalQuestions(total);
  }, [topics]);

  // Handle changes to input fields within each topic
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTopics = topics.map((topic, i) =>
      i === index ? { ...topic, [name]: value } : topic
    );
    setTopics(updatedTopics);
  };

  // Handle adding a new topic to the list
  const handleAddTopic = (e) => {
    e.preventDefault();
    if (totalQuestions < assignmentConfigData.TotalQuestions) {
      setTopics([
        ...topics,
        { TopicID: "", DifficultyId: "", NumberOfQuestions: "" },
      ]);
    } else {
      setErrorMessage(
        `Total number of questions exceeds ${assignmentConfigData.TotalQuestions}.`
      );
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalQuestions > assignmentConfigData.TotalQuestions) {
      setErrorMessage(
        `Total number of questions exceeds ${assignmentConfigData.TotalQuestions}.`
      );
    } else if (
      topics.some(
        (topic) =>
          !topic.TopicID || !topic.DifficultyId || !topic.NumberOfQuestions
      )
    ) {
      setErrorMessage("All fields are mandatory.");
    } else {
      setErrorMessage("");
      // Send topics list to parent component
      onSubmitTopics(topics);
    }
  };

  return (
    <form className="form-content" onSubmit={handleSubmit}>
      {topics.map((topic, index) => (
        <div key={index}>
          <div className="form-group">
            <label htmlFor={`TopicID-${index}`}>Topic</label>
            <select
              name="TopicID"
              value={topic.TopicID}
              onChange={(e) => handleChange(index, e)}
              required
            >
              <option value="">Select Topic</option>
              {availableTopics.map((topicOption) => (
                <option key={topicOption.id} value={topicOption.id}>
                  {topicOption.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`DifficultyId-${index}`}>Difficulty</label>
            <select
              name="DifficultyId"
              value={topic.DifficultyId}
              onChange={(e) => handleChange(index, e)}
              required
            >
              <option value="">Select Difficulty</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor={`NumberOfQuestions-${index}`}>
              Number of Questions
            </label>
            <input
              name="NumberOfQuestions"
              type="number"
              value={topic.NumberOfQuestions}
              onChange={(e) => handleChange(index, e)}
              placeholder="Number of Questions"
              required
            />
          </div>
        </div>
      ))}
      {totalQuestions < assignmentConfigData.TotalQuestions && (
        <button className="upload" onClick={handleAddTopic}>
          Add Topic
        </button>
      )}
      <button className="upload" type="submit">
        Submit
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default AssignmentConfigTopicsForm;
