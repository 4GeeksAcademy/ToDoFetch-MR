import React, { useState } from "react";

const UserCreation = ({ setuser_name }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [error, setError] = useState("");

  const handleCreateUser = async () => {
    if (!usernameInput.trim()) {
      setError("Enter a username");
      return;
    }

    try {
      const checkResponse = await fetch(
        `https://playground.4geeks.com/todo/users/${usernameInput.trim()}`
      );

      if (checkResponse.ok) {
        const userData = await checkResponse.json();
        setuser_name(usernameInput.trim());
        console.log("Existing user data:", userData);
      } else if (checkResponse.status === 404) {
        const createResponse = await fetch(
          `https://playground.4geeks.com/todo/users/${usernameInput.trim()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          }
        );

        if (createResponse.ok) {
          setuser_name(usernameInput.trim());
        } else {
          const errorData = await createResponse.json();
          throw new Error(errorData.detail || "Failed to create user");
        }
      } else {
        throw new Error("Unexpected error occurred");
      }
    } catch (error) {
      setError(error.message || "Error processing user");
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={usernameInput}
        onChange={(e) => {
          setUsernameInput(e.target.value);
          setError("");
        }}
        placeholder="Enter your username"
      />
      <button onClick={handleCreateUser}>Continue</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UserCreation;
