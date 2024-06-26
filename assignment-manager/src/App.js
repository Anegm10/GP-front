import React from "react";
import ReactDOM from "react-dom";
import AssignmentManager from "./Assignment/AssignmentManager";
import QuestionAccordion from "./Questionbank/QuestionAccordion";
import Dashboard from "./Dashborad/Dashboard";
import Homepage from "./Homepage/Homepage";
import "./Assignment/styles.css"; // Assuming the styles are in styles.css

const App = () => {
  return (
    <div className="app">
      <Dashboard />
    </div>
  );
};

export default App;

// This is the entry point to render the App component
//ReactDOM.render(<App />, document.getElementById("root"));
