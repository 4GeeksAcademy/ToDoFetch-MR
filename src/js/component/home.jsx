import React, { useState } from "react";
import UserCreation from "./userCreation";
import TodoList from "./ToDoList";

const Home = () => {
  // keep track of user_name
  const [user_name, setuser_name] = useState(null);
  const handleUserCreated = (newuser_name) => {
    setuser_name(newuser_name);
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
