import React, { useState } from "react";
import UserCreation from "./UserCreation";
import TodoList from "./ToDoList";

const Home = () => {
  const [user_name, setUser_name] = useState(null);

  const handleUserCreated = (newUser_name) => {
    setUser_name(newUser_name);
  };

  return (
    <div>
      <h1>To-Dos!</h1>
      <div className="container">
        {!user_name ? (
          <UserCreation onUserCreated={handleUserCreated} />
        ) : (
          <TodoList user_name={user_name} />
        )}
      </div>
    </div>
  );
};

export default Home;
