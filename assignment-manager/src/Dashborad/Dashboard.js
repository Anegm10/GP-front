import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (year && term) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            `https://learnhub.runasp.net/api/Course/StudentCount?year=${year}&term=${encodeURIComponent(
              term
            )}`
          );
          const data = response.data;

          if (data && data.length > 0) {
            const courses = data.map((item) => item.courseName);
            const students = data.map((item) => item.studentCount);

            setChartData({
              labels: courses,
              datasets: [
                {
                  label: `Student Enrollments in ${year} ${term}`,
                  data: students,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            });
          } else {
            setChartData(null); // No data case
          }
        } catch (err) {
          setError("Failed to fetch data");
          setChartData(null); // Reset chart data on error
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [year, term]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Enrollment Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="year" style={{ marginRight: "10px" }}>
          Filter by Year:{" "}
        </label>
        <select id="year" value={year} onChange={handleYearChange}>
          <option value="">Select a year</option>
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
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="term" style={{ marginRight: "10px" }}>
          Filter by Term:{" "}
        </label>
        <select id="term" value={term} onChange={handleTermChange}>
          <option value="">Select a term</option>
          <option value="1st Term">1st Term</option>
          <option value="2nd Term">2nd Term</option>
          <option value="Summer">Summer</option>
        </select>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : chartData ? (
          <Bar
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
