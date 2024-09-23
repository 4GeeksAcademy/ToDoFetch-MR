import React, { useState } from "react";
import UserCreation from "./userCreation";
import TodoList from "./ToDoList";

const Home = () => {
  const [user_name, setUser_name] = useState(null);

  return (
    <div>
      <h1>To-Dos!</h1>
      <div className="container">
        {!user_name ? (
          <UserCreation setuser_name={setUser_name} />
        ) : (
          <TodoList user_name={user_name} setUser_name={setUser_name} />
        )}
      </div>
      <div className="container-2"></div>
      <div className="container-3"></div>
    </div>
  );
};

export default Home;
