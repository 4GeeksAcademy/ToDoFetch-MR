import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ user_name }) => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const API_URL = `https://playground.4geeks.com/todo/todos/${user_name}`;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTodos(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  };

  const updateTodos = (newTodos) => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newTodos),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => setTodos([...todos, newTodos]))
      .catch((error) => console.error("Error updating todos:", error));
  };

  const handleNewTask = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTodos = { label: inputValue.trim(), done: false };
      updateTodos(newTodos);
      setInputValue("");
    }
  };

  const handleRemoveTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    updateTodos(newTodos);
  };

  const handleCleanAllTasks = () => {
    fetch(API_URL, { method: "DELETE" })
      .then(() => setTodos([]))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h2>{user_name}'s To-Do List</h2>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleNewTask}
          placeholder="Add a new task"
        />
      </div>
      <ul>
        {todos.length === 0 ? (
          <li>No tasks, add a task</li>
        ) : (
          todos.map((todo, index) => (
            <li key={index}>
              <span>{todo.label}</span>
              <button onClick={() => handleRemoveTask(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))
        )}
      </ul>
      <button onClick={handleCleanAllTasks}>Clean All Tasks</button>
    </div>
  );
};

export default TodoList;
