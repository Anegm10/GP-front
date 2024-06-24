import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const QuestionAccordion = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
      type: "text",
      topic: "lesson1",
      difficulty: 1,
      isExpanded: false,
      isEditing: false,
    },
    {
      id: 2,
      question: "What are hooks in React?",
      answer:
        "Hooks are functions that let you use state and other React features without writing a class.",
      type: "text",
      topic: "lesson2",
      difficulty: 2,
      isExpanded: false,
      isEditing: false,
    },
    {
      id: 3,
      question: "What is JSX?",
      answer: "JSX is a syntax extension for JavaScript.",
      type: "text",
      topic: "lesson3",
      difficulty: 3,
      isExpanded: false,
      isEditing: false,
    },
    {
      id: 4,
      question: "What are components in React?",
      answer: "Components are independent and reusable pieces of code.",
      type: "text",
      topic: "lesson1",
      difficulty: 1,
      isExpanded: false,
      isEditing: false,
    },
    {
      id: 5,
      type: "mcq",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: 2,
      editedQuestion: "",
      editedOptions: [],
      editedCorrectAnswer: -1,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: 6,
      type: "mcq",
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      editedQuestion: "",
      editedOptions: [],
      editedCorrectAnswer: -1,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: 7,
      question: "Explain the importance of virtual DOM in React.",
      answer: "Virtual DOM allows React to minimize DOM manipulation...",
      type: "text",
      editedQuestion: "",
      editedAnswer: "", // Add editedAnswer field for essay questions
      topic: "lesson3",
      difficulty: 2,
      isEditing: false,
      isExpanded: false,
    },
    {
      id: 8,
      question: "What is a higher-order component in React?",
      answer:
        "A higher-order component is a function that takes a component...",
      type: "text",
      editedQuestion: "",
      editedAnswer: "", // Add editedAnswer field for essay questions
      topic: "lesson2",
      difficulty: 3,
      isEditing: false,
      isExpanded: false,
    },
  ]);

  const toggleQuestion = (index) => {
    const updatedQuestions = questions.map((q, i) => ({
      ...q,
      isExpanded: i === index ? !q.isExpanded : false,
    }));
    setQuestions(updatedQuestions);
  };

  const handleEdit = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].editedQuestion = updatedQuestions[index].question;
    if (updatedQuestions[index].type === "mcq") {
      updatedQuestions[index].editedOptions = [
        ...updatedQuestions[index].options,
      ];
      updatedQuestions[index].editedCorrectAnswer =
        updatedQuestions[index].correctAnswer;
    } else if (updatedQuestions[index].type === "text") {
      updatedQuestions[index].editedAnswer = updatedQuestions[index].answer;
    }
    updatedQuestions[index].isEditing = true;
    setQuestions(updatedQuestions);
  };

  const handleSave = (index) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[index];
    question.question = question.editedQuestion;
    if (question.type === "mcq") {
      question.options = question.editedOptions;
      question.correctAnswer = question.editedCorrectAnswer;
      question.editedOptions = [];
      question.editedCorrectAnswer = -1;
    } else if (question.type === "text") {
      question.answer = question.editedAnswer;
      question.editedAnswer = ""; // Clear editedAnswer after save
    }
    question.isEditing = false;
    setQuestions(updatedQuestions);

    // Create a new object excluding the `id` field
    const { id, ...questionData } = question;

    // Log the JSON data to the console
    console.log(JSON.stringify(questionData));

    // Send the data to the backend using fetch()
    fetch("/update-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Question updated successfully:", data);
        // Optionally handle success feedback
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        // Optionally handle error feedback
      });
  };

  const handleQuestionChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].editedQuestion = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].editedAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].editedOptions[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].editedCorrectAnswer = parseInt(value);
    setQuestions(updatedQuestions);
  };

  const cancelEdit = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isEditing = false;
    updatedQuestions[index].editedQuestion = "";
    updatedQuestions[index].editedAnswer = ""; // Clear editedAnswer on cancel
    setQuestions(updatedQuestions);
  };

  const handleTopicChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].topic = value;
    setQuestions(updatedQuestions);
  };

  const handleDifficultyChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].difficulty = parseInt(value);
    setQuestions(updatedQuestions);
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {questions.map((q, index) => (
        <div
          key={q.id}
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => toggleQuestion(index)}
          >
            <div style={{ flex: 1 }}>
              {q.isEditing ? (
                <textarea
                  value={q.editedQuestion}
                  onChange={(e) => handleQuestionChange(e, index)}
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    fontSize: "1.2em",
                  }}
                />
              ) : (
                <h3>{q.question}</h3>
              )}
            </div>
            <div style={{ marginLeft: "10px" }}>
              {q.isExpanded ? (
                <FontAwesomeIcon icon={faAngleUp} />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} />
              )}
            </div>
          </div>
          {q.isExpanded && (
            <div style={{ marginTop: "10px" }}>
              {q.type === "text" && !q.isEditing && <p>{q.answer}</p>}
              {q.type === "mcq" && !q.isEditing && (
                <>
                  {q.options.map((option, i) => (
                    <div key={i} style={{ marginBottom: "5px" }}>
                      <input
                        type="radio"
                        name={`correctAnswer-${index}`}
                        value={i}
                        checked={q.correctAnswer === i}
                        readOnly
                        style={{ marginRight: "10px" }}
                      />
                      <span
                        style={{
                          fontWeight: q.correctAnswer === i ? "bold" : "normal",
                        }}
                      >
                        {option}
                      </span>
                    </div>
                  ))}
                </>
              )}
              {q.isEditing && q.type === "mcq" && (
                <>
                  {q.editedOptions.map((option, i) => (
                    <div key={i} style={{ marginBottom: "5px" }}>
                      <input
                        type="radio"
                        name={`editedCorrectAnswer-${index}`}
                        value={i}
                        checked={q.editedCorrectAnswer === i}
                        onChange={(e) => handleCorrectAnswerChange(e, index)}
                        style={{ marginRight: "10px" }}
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e, index, i)}
                        style={{ width: "calc(100% - 50px)" }}
                      />
                    </div>
                  ))}
                </>
              )}
              {q.type === "text" && q.isEditing && (
                <textarea
                  value={q.editedAnswer}
                  onChange={(e) => handleAnswerChange(e, index)}
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    fontSize: "1em",
                  }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  {q.isEditing && (
                    <>
                      <label>
                        Topic:
                        <select
                          value={q.topic}
                          onChange={(e) => handleTopicChange(e, index)}
                          style={{ marginLeft: "10px" }}
                        >
                          <option value="lesson1">Lesson 1</option>
                          <option value="lesson2">Lesson 2</option>
                          <option value="lesson3">Lesson 3</option>
                        </select>
                      </label>
                      <label style={{ marginLeft: "20px" }}>
                        Difficulty:
                        <select
                          value={q.difficulty}
                          onChange={(e) => handleDifficultyChange(e, index)}
                          style={{ marginLeft: "10px" }}
                        >
                          <option value={1}>Easy</option>
                          <option value={2}>Medium</option>
                          <option value={3}>Hard</option>
                        </select>
                      </label>
                    </>
                  )}
                  {!q.isEditing && (
                    <>
                      <div>
                        <strong>Topic:</strong> {q.topic}
                      </div>
                      <div>
                        <strong>Difficulty:</strong>{" "}
                        {q.difficulty === 1
                          ? "Easy"
                          : q.difficulty === 2
                          ? "Medium"
                          : "Hard"}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {!q.isEditing && (
                    <button
                      style={{
                        marginRight: "5px",
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderRadius: "3px",
                      }}
                      onClick={() => handleEdit(index)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  )}
                  {q.isEditing && (
                    <>
                      <button
                        style={{
                          marginRight: "5px",
                          backgroundColor: "blue",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderRadius: "3px",
                        }}
                        onClick={() => handleSave(index)}
                      >
                        <FontAwesomeIcon icon={faSave} /> Save
                      </button>
                      <button
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderRadius: "3px",
                        }}
                        onClick={() => cancelEdit(index)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionAccordion;
