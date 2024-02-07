import React from "react";
import axios from "axios"; // Import axios

const Profile = () => {
  // Assuming selectedRow contains the ID of the profile you want to view
  const selectedRow = { id: 123 }; // Replace this with your actual data
  const token = "yourAuthToken"; // Replace this with your actual authentication token

  const handleViewProfile = () => {
    const Id = selectedRow.id;

    axios
      .get(`http://localhost:5000/api/student/get-student/${Id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
      .then((response) => {
        console.log("Profile data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  return (
    <>
      <h1> fghj </h1>
    </>
  );
};

export default Profile;
