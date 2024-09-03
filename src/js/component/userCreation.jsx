import React, { useState } from "react";

const UserCreation = ({ onUserCreated }) => {
  const [user_name, setUser_name] = useState("");
  const [error, setError] = useState("");

  const handleCreateUser = () => {
    if (user_name.trim()) {
      fetch(`https://playground.4geeks.com/todo/users/${user_name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to create user");
          }
        })
        .then((data) => {
          onUserCreated(user_name);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          setError("Failed to create user. Please try again.");
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={user_name}
        onChange={(e) => setUser_name(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default UserCreation;
