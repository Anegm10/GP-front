import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const [editableStudent, setEditableStudent] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    address: "",
    account: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    // Comment out the actual API call for testing purposes
    // const fetchStudentData = async () => {
    //   try {
    //     const response = await axios.get("http://learnhub.runasp.net/api/user/id"); // Replace with the actual user ID
    //     const studentData = response.data;
    //     console.log("Fetched student data:", studentData);
    //     setStudent(studentData);
    //     setEditableStudent({
    //       name: studentData.name,
    //       gender: studentData.gender,
    //       phoneNumber: studentData.phoneNumber,
    //       address: studentData.address,
    //       account: studentData.account,
    //     });
    //   } catch (error) {
    //     console.error("Error fetching student data", error);
    //   }
    // };

    // fetchStudentData();

    // Use mock data for testing purposes
    const mockStudentData = {
      id: "123456",
      userId: "user123",
      name: "John Doe",
      gender: "Male",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      account: "johndoe@example.com",
      userType: "student", // or "parent" or "instructor"
    };

    setStudent(mockStudentData);
    setEditableStudent({
      name: mockStudentData.name,
      gender: mockStudentData.gender,
      phoneNumber: mockStudentData.phoneNumber,
      address: mockStudentData.address,
      account: mockStudentData.account,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableStudent({ ...editableStudent, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSave = () => {
    const updatedData = {
      name: editableStudent.name,
      gender: editableStudent.gender,
      phoneNumber: editableStudent.phoneNumber,
      address: editableStudent.address,
      account: editableStudent.account,
    };

    let apiUrl;
    switch (student.userType) {
      case "student":
        apiUrl = `http://learnhub.runasp.net/api/Student/UpdateStudent/${student.id}`;
        break;
      case "parent":
        apiUrl = `http://learnhub.runasp.net/api/Parent/UpdateParent/${student.id}`;
        break;
      case "instructor":
        apiUrl = `http://learnhub.runasp.net/api/Instructor/UpdateInstructor/${student.id}`;
        break;
      default:
        console.error("Unknown user type");
        return;
    }

    axios
      .put(apiUrl, updatedData)
      .then((response) => {
        console.log("Data saved successfully", response.data);
        setStudent({
          ...student,
          ...editableStudent,
        });
      })
      .catch((error) => {
        console.error("Error saving data", error);
      });
  };

  const handleChangePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    const passwordDataToSend = {
      userId: student.userId,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    axios
      .post(
        "http://learnhub.runasp.net/index.html/api/Auth/ChangePassword",
        passwordDataToSend
      )
      .then((response) => {
        console.log("Password changed successfully", response.data);
        alert("Password changed successfully");
      })
      .catch((error) => {
        console.error(
          "Error changing password",
          error.response ? error.response.data : error.message
        );
        alert("Error changing password");
      });
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-info">
      <h2>Student Information</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editableStudent.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>ID:</label>
        <span>{student.id}</span>
      </div>
      <div>
        <label>User ID:</label>
        <span>{student.userId}</span>
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={editableStudent.gender}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Account:</label>
        <input
          type="text"
          name="account"
          value={editableStudent.account}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={editableStudent.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={editableStudent.address}
          onChange={handleInputChange}
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>

      <h2>Change Password</h2>
      <div>
        <label>Current Password:</label>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword}
          onChange={handlePasswordChange}
        />
      </div>
      <button className="save-button" onClick={handleChangePassword}>
        Change Password
      </button>
    </div>
  );
};

export default StudentInfo;
