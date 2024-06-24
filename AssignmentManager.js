import React, { useState, useEffect } from "react";
import AssignmentConfigForm from "./AssignmentConfigForm";
import AssignmentConfigTopicsForm from "./AssignmentConfigTopicsForm";
import "./styles.css"; // Assuming the styles are in styles.css

const AssignmentManager = () => {
  const [assignmentConfigData, setAssignmentConfigData] = useState(null);
  const [availableTopics, setAvailableTopics] = useState([]);

  useEffect(() => {
    // Simulate fetching available topics from the backend
    const fetchAvailableTopics = () => {
      return [
        { id: "1", name: "Lesson 1" },
        { id: "2", name: "Lesson 2" },
        { id: "3", name: "Lesson 3" },
      ];
    };

    setAvailableTopics(fetchAvailableTopics());
  }, []);

  const handleAssignmentConfigSubmit = (data) => {
    setAssignmentConfigData(data);
  };

  const handleTopicsSubmit = (topics) => {
    // Combine assignment config data and topics
    const combinedData = {
      ...assignmentConfigData,
      topics: topics,
    };

    // Send combined data to backend
    fetch("your-backend-url/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "Successfully sent assignment and topics to backend:",
          data
        );
        // Handle any further UI updates or responses from backend
      })
      .catch((error) => {
        console.error("Error sending assignment and topics to backend:", error);
        // Handle error scenarios
      });
  };

  return (
    <div className="assignment-manager">
      {assignmentConfigData ? (
        <AssignmentConfigTopicsForm
          assignmentConfigData={assignmentConfigData}
          onSubmitTopics={handleTopicsSubmit}
          availableTopics={availableTopics}
        />
      ) : (
        <AssignmentConfigForm onSubmit={handleAssignmentConfigSubmit} />
      )}
    </div>
  );
};

export default AssignmentManager;
