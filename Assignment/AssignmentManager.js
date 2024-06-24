import React, { useState, useEffect } from "react";
import AssignmentConfigForm from "./AssignmentConfigForm";
import AssignmentConfigTopicsForm from "./AssignmentConfigTopicsForm";
import "./styles.css"; // Assuming the styles are in styles.css

const AssignmentManager = () => {
  const [assignmentConfigData, setAssignmentConfigData] = useState(null);
  const [availableTopics, setAvailableTopics] = useState([]);

  useEffect(() => {
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
    const combinedData = {
      ...assignmentConfigData,
      topics: topics,
    };

    // Send combined data to backend to save
    fetch("http://localhost:5000/assignments", {
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

  useEffect(() => {
    // Function to fetch assignments from backend
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:5000/assignments"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data = await response.json();
        console.log("Fetched assignments:", data);
        // Handle data received from backend as needed
      } catch (error) {
        console.error("Error fetching assignments:", error);
        // Handle error scenarios
      }
    };

    fetchAssignments(); // Call the fetchAssignments function
  }, []); // Empty dependency array ensures this effect runs only once

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
