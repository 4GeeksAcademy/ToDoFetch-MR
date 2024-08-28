import React, { useState } from "react";

const UserCreation = ({ onUserCreated }) => {
  // username creation via state input
  const [username, setUsername] = useState("");

  const handleCreateUser = () => {
    if (username.trim()) {
      fetch(`https://playground.4geeks.com/todo/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 201) {
            onUserCreated(username);
          } else {
            console.error("Failed to create user");
          }
        })
        .catch((error) => console.error("Error creating user:", error));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default UserCreation;
