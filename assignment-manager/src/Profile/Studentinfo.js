import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const StudentInfo = () => {
  const [userType, setUserType] = useState("student"); // Default to parent
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
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
    // Fetch user data from backend API based on userType
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://learnhub.runasp.net/api/${userType}/20240001`
        );
        const userData = response.data; // Assuming response.data contains the user data
        setUser(userData);
        setEditableUser({
          name: userData.name,
          gender: userData.gender,
          phoneNumber: userData.account.phoneNumber,
          address: userData.address,
          account: userData.account.email,
        });
      } catch (error) {
        console.error(`Error fetching ${userType} data:`, error.message);
        // Handle error fetching data, e.g., show an error message
      }
    };

    fetchUserData(); // Call the fetch function
  }, [userType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSave = () => {
    const updatedData = {
      name: editableUser.name,
      gender: editableUser.gender,
      address: editableUser.address,
      account: {
        phoneNumber: editableUser.phoneNumber,
      },
    };

    // Check if any field has changed
    const fieldsChanged =
      updatedData.name !== user.name ||
      updatedData.gender !== user.gender ||
      updatedData.address !== user.address ||
      updatedData.account.phoneNumber !== user.account.phoneNumber;

    if (!fieldsChanged) {
      console.log("No changes made, skipping save.");
      return; // If no changes, simply return
    }

    console.log("Updated data to send:", updatedData);

    let apiUrl = `http://learnhub.runasp.net/api/${capitalizeFirstLetter(
      userType
    )}/Update${capitalizeFirstLetter(userType)}/${user.id}`;

    console.log("API URL:", apiUrl);

    axios
      .put(apiUrl, updatedData)
      .then((response) => {
        console.log(`Data saved successfully for ${userType}`, response.data);
        // Update the local user state with the latest saved data
        setUser({
          ...user,
          ...updatedData,
          account: {
            ...user.account,
            phoneNumber: updatedData.account.phoneNumber,
          },
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error(`Error saving data for ${userType}`, error.response);

          // Improved error handling
          let errorMessage = `Error saving data for ${userType}.`;
          if (error.response.data) {
            const errorData = error.response.data;
            if (errorData.errors) {
              const validationErrors = errorData.errors;
              errorMessage = `Validation errors occurred for ${userType}:\n`;
              Object.keys(validationErrors).forEach((key) => {
                errorMessage += `- ${key}: ${validationErrors[key].join(
                  ", "
                )}\n`;
              });
            } else if (errorData.title) {
              errorMessage = `Error saving data for ${userType}: ${errorData.title}`;
            } else if (typeof errorData === "string") {
              errorMessage = `Error saving data for ${userType}: ${errorData}`;
            } else {
              errorMessage = `Error saving data for ${userType}: ${JSON.stringify(
                errorData
              )}`;
            }
          } else {
            errorMessage = `Error saving data for ${userType}: ${error.message}`;
          }

          alert(errorMessage);
          console.error(
            `Error saving data details for ${userType}:`,
            error.response.data
          );
        } else {
          console.error(`Error saving data for ${userType}`, error.message);
          alert(`Error saving data for ${userType}: ${error.message}`);
        }
      });
  };

  const handleChangePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    const passwordDataToSend = {
      userId: user.account.id,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    console.log("Password change request body:", passwordDataToSend);

    axios
      .post(
        "http://learnhub.runasp.net/api/Auth/ChangePassword",
        passwordDataToSend
      )
      .then((response) => {
        console.log("Password changed successfully", response.data);
        alert("Password changed successfully");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data[""]) {
          console.error("Error changing password", error.response.data[""][0]);
          alert("Error changing password: " + error.response.data[""][0]);
        } else {
          console.error("Error changing password", error.message);
          alert("Error changing password: " + error.message);
        }
      });
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-info-container">
      <div className="user-info">
        <h2 className="section-title">{`${capitalizeFirstLetter(
          userType
        )} Information`}</h2>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-input"
            name="name"
            value={editableUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">ID:</label>
          <span>{user.id}</span>
        </div>
        <div className="form-group">
          <label className="form-label">National ID:</label>
          <span>{user.nationalId}</span>
        </div>
        <div className="form-group">
          <label className="form-label">Gender:</label>
          <input
            type="text"
            className="form-input"
            name="gender"
            value={editableUser.gender || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Account:</label>
          <input
            type="text"
            className="form-input"
            name="account"
            value={editableUser.account}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            className="form-input"
            name="phoneNumber"
            value={editableUser.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-input"
            name="address"
            value={editableUser.address || ""}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      <div className="password-change">
        <h2 className="section-title">Change Password</h2>
        <div className="form-group">
          <label className="form-label">Current Password:</label>
          <input
            type="password"
            className="form-input"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">New Password:</label>
          <input
            type="password"
            className="form-input"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm New Password:</label>
          <input
            type="password"
            className="form-input"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="btn save-button" onClick={handleChangePassword}>
          Change Password
        </button>
      </div>
    </div>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default StudentInfo;
