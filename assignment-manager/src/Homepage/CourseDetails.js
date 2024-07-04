import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { courseId } = useParams(); // Extract courseId from URL params
  const [course, setCourse] = useState(null); // State to hold course data
  const [userType, setUserType] = useState("student"); // User type: "student" or "instructor"
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for fetching course details

  useEffect(() => {
    const fetchCourseDetails = async () => {
      console.log(`Fetching course details for courseId: ${courseId}`);
      setLoading(true); // Set loading state to true before fetching
      try {
        // Fetch course details from API based on courseId
        const response = await axios.get(
          `http://learnhub.runasp.net/api/Course/${courseId}`
        );
        console.log("Course details fetched:", response.data);
        setCourse(response.data); // Set course state with fetched data
        setLoading(false); // Set loading state to false after fetching
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to fetch course details"); // Set error state if fetching fails
        setLoading(false); // Set loading state to false on error
      }
    };

    // Fetch course details only if courseId exists
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]); // Dependency array ensures effect runs only when courseId changes

  // Function to handle enrollment button click
  const handleEnrollment = async () => {
    const enrollmentData = {
      courseId: course.id, // Include courseId in enrollment data
    };

    try {
      // Perform enrollment based on userType
      if (userType === "student") {
        await axios.post(
          "http://learnhub.runasp.net/api/StudentCourse",
          enrollmentData
        );
        alert("Enrollment successful as a student");
      } else if (userType === "instructor") {
        // Replace hardcoded values with dynamic values
        const instructorId = 1; // Example instructorId (replace with actual value)
        await axios.post(
          `http://learnhub.runasp.net/api/Teach?InstructorId=${instructorId}&CourseId=${courseId}`,
          enrollmentData
        );
        alert("Enrollment successful as an instructor");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Enrollment failed"); // Alert user if enrollment fails
    }
  };

  // Render loading indicator while fetching course details
  if (loading) return <div>Loading...</div>;
  // Render error message if fetching course details fails
  if (error) return <div>{error}</div>;

  // Render course details once fetched
  return (
    <div className="course-details-container">
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <p>Duration: {course.duration}</p>
      <p>
        Instructors: {course.instructors.map((inst) => inst.name).join(", ")}
      </p>
      <h3>Materials</h3>
      <ul>
        {course.materials?.map((material) => (
          <li key={material.id}>
            <a
              href={material.materialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {material.materilaTitle}{" "}
              {/* Corrected typo: material.materialTitle */}
            </a>
          </li>
        ))}
      </ul>
      {/* Render enrollment button for student or instructor */}
      {userType === "student" || userType === "instructor" ? (
        <div className="enrollment-container">
          <button onClick={handleEnrollment} className="enrollment-submit">
            Enroll
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CourseDetails;
