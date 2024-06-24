// src/components/Dashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Uncomment and modify the following lines when backend is ready
        // const response = await axios.get(`/api/enrollments?year=${year}`);
        // const data = response.data;

        // Mock data for testing
        const data = [
          { course: "Math", students: 30 },
          { course: "Science", students: 25 },
          { course: "History", students: 20 },
          { course: "English", students: 35 },
        ];

        if (data && data.length) {
          const courses = data.map((item) => item.course);
          const students = data.map((item) => item.students);

          setChartData({
            labels: courses,
            datasets: [
              {
                label: `Student Enrollments in ${year}`,
                data: students,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        } else {
          setChartData({});
        }
      } catch (err) {
        setError("Failed to fetch data");
        setChartData({});
      }

      setLoading(false);
    };

    fetchData();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Enrollment Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="year" style={{ marginRight: "10px" }}>
          Filter by Year:{" "}
        </label>
        <select id="year" value={year} onChange={handleYearChange}>
          {Array.from(
            new Array(10),
            (v, i) => new Date().getFullYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Bar
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
