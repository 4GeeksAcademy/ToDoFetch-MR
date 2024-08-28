import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ username }) => {
  //  to-do list and new tasts to the list
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);

  // API endpoint and fetch
  const API_URL = `https://playground.4geeks.com/todo/users/${username}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setToDos(data.todos))
      .catch((error) => console.error("Error fetching data:", error));
  }, [username]);

  // functionality/ handling events for username input and new tasks and deleting tasks
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleNewTask = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTask = { label: inputValue, is_done: false };
      fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          setToDos([...toDos, data]);
          setInputValue("");
        })
        .catch((error) => console.error("Adding task error:", error));
    }
  };

  const handleRemoveTask = (index) => {
    const taskToRemove = toDos[index];
    fetch(`https://playground.4geeks.com/todo/todos/${taskToRemove.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newToDos = toDos.filter((_, i) => i !== index);
        setToDos(newToDos);
      })
      .catch((error) => console.error("Delete task error:", error));
  };

  return (
    <div>
      <h2>{username}'s To-Do List</h2>
      <div className="container">
        <ul>
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleNewTask}
            placeholder="Type your task here!"
          />
          {toDos.length === 0 ? (
            <li>No tasks, add a task</li>
          ) : (
            toDos.map((todo, index) => (
              <li key={index}>
                {todo.label}
                <button
                  className="delete"
                  onClick={() => handleRemoveTask(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
