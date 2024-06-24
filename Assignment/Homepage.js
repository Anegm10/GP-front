// src/components/Homepage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";

const Homepage = () => {
  const [courses, setCourses] = useState([]);
  const [enrollmentCode, setEnrollmentCode] = useState({});

  useEffect(() => {
    // Mock data for testing
    const mockData = [
      {
        id: 1,
        title: "Create An LMS Website With LearnPress",
        instructor: "DeterminedPotato",
        duration: "2 Weeks",
        students: 156,
        category: "Photography",
        image: "https://via.placeholder.com/300x150", // Placeholder image URL
      },
      {
        id: 2,
        title: "Create An LMS Website With LearnPress",
        instructor: "DeterminedPotato",
        duration: "2 Weeks",
        students: 156,
        category: "Photography",
        image: "https://via.placeholder.com/300x150", // Placeholder image URL
      },
      {
        id: 3,
        title: "Create An LMS Website With LearnPress",
        instructor: "DeterminedPotato",
        duration: "2 Weeks",
        students: 156,
        category: "Photography",
        image: "https://via.placeholder.com/300x150", // Placeholder image URL
      },
      {
        id: 4,
        title: "Create An LMS Website With LearnPress",
        instructor: "DeterminedPotato",
        duration: "2 Weeks",
        students: 156,
        category: "Photography",
        image: "https://via.placeholder.com/300x150", // Placeholder image URL
      },
      {
        id: 5,
        title: "Create An LMS Website With LearnPress",
        instructor: "DeterminedPotato",
        duration: "2 Weeks",
        students: 156,
        category: "Photography",
        image: "https://via.placeholder.com/300x150", // Placeholder image URL
      },
      {
        id: 6,
        title: "Create An LMS Website With LearnPress",
        instructor: "DeterminedPotato",
        duration: "2 Weeks",
        students: 156,
        category: "Photography",
        image: "https://via.placeholder.com/300x150", // Placeholder image URL
      },
    ];

    setCourses(mockData);

    // Uncomment the following lines when backend is ready
    // const fetchCourses = async () => {
    //   try {
    //     const response = await axios.get('/api/courses');
    //     setCourses(response.data);
    //   } catch (error) {
    //     console.error('Error fetching courses:', error);
    //   }
    // };

    // fetchCourses();
  }, []);

  const handleCardClick = (courseId) => {
    setEnrollmentCode((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleInputChange = (e, courseId) => {
    setEnrollmentCode((prev) => ({
      ...prev,
      [courseId]: e.target.value,
    }));
  };

  const handleSubmit = (courseId) => {
    alert(
      `Enrollment code for course ${courseId}: ${enrollmentCode[courseId]}`
    );
  };

  return (
    <div className="homepage-container">
      <h1>Build Skills With Online Course</h1>
      <div className="courses-container">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => handleCardClick(course.id)}
          >
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>by {course.instructor}</p>
              <p>{course.duration}</p>
              <p>{course.students} Students</p>
              <div className="course-category">{course.category}</div>
            </div>
            {enrollmentCode[course.id] && (
              <div className="enrollment-container">
                <input
                  type="text"
                  placeholder="Enter Enrollment Code"
                  value={enrollmentCode[course.id] || ""}
                  onChange={(e) => handleInputChange(e, course.id)}
                  className="enrollment-input"
                />
                <button
                  onClick={() => handleSubmit(course.id)}
                  className="enrollment-submit"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
