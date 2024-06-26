import React, { useState, useEffect } from "react";
import AssignmentConfigForm from "./AssignmentConfigForm";
import AssignmentConfigTopicsForm from "./AssignmentConfigTopicsForm";
import "./styles.css"; // Assuming the styles are in styles.css

const AssignmentManager = () => {
  // State to hold assignment configuration data
  const [assignmentConfigData, setAssignmentConfigData] = useState(null);
  // State to hold available topics
  const [availableTopics, setAvailableTopics] = useState([]);

  // Effect to fetch available topics when the component mounts
  useEffect(() => {
    const fetchAvailableTopics = () => {
      // Simulated fetch function, replace with actual data fetch if needed
      return [
        { id: "1", name: "Lesson 1" },
        { id: "2", name: "Lesson 2" },
        { id: "3", name: "Lesson 3" },
      ];
    };

    // Set available topics state
    setAvailableTopics(fetchAvailableTopics());
  }, []);

  // Handler for submitting assignment configuration data
  const handleAssignmentConfigSubmit = (data) => {
    setAssignmentConfigData(data);
  };

  // Handler for submitting topics
  const handleTopicsSubmit = (topics) => {
    // Combine assignment configuration data and topics
    const combinedData = {
      ...assignmentConfigData,
      topics: topics,
    };

    // Send combined data to the backend
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

  // Effect to fetch assignments from the backend when the component mounts
  useEffect(() => {
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

    // Call the fetchAssignments function
    fetchAssignments();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="assignment-manager">
      {assignmentConfigData ? (
        // Render the topics form if assignment configuration data is available
        <AssignmentConfigTopicsForm
          assignmentConfigData={assignmentConfigData}
          onSubmitTopics={handleTopicsSubmit}
          availableTopics={availableTopics}
        />
      ) : (
        // Render the assignment configuration form if no data is available
        <AssignmentConfigForm onSubmit={handleAssignmentConfigSubmit} />
      )}
    </div>
  );
};

export default AssignmentManager;
