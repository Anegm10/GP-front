import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToCourseId, setRedirectToCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://learnhub.runasp.net/api/Course"
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseDetails = (courseId) => {
    setRedirectToCourseId(courseId);
  };

  if (redirectToCourseId) {
    return <Redirect to={`/course/${redirectToCourseId}`} />;
  }

  return (
    <div className="homepage-container">
      <h1>Build Skills With Online Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="courses-container">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.name}</h3>
              <p>ID: {course.id}</p>
              <p>Duration: {course.duration}</p>
              <button
                onClick={() => handleCourseDetails(course.id)}
                className="course-details-button"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
