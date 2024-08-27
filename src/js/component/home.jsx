import React, { useEffect, useState } from "react";
import style from "../../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://playground.4geeks.com/todo/users";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  // fetch api
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setToDos(data))
      .catch((error) => console.error("Error fetching data".error));
  });
  // add new task via post method to API
  const handleNewTask = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTask = { task: inputValue };
      fetch(API_URL, {
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
        .catch((error) => console.error("Adding task error".error));
    }
  };

  // remove task via delete method to API
  const handleRemoveTask = (index) => {
    const removeTask = toDos[index];
    fetch(`${API_URL}/${removeTask.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newToDos = toDos.filter((_, i) => i !== index);
        setToDos(newToDos);
      })
      .catch((error) => console.error("Delete task error", error));
  };
  // clear task button
  // pending here
  return (
    <div>
      <h1>To-Dos!</h1>
      <h2>Add or remove tasks</h2>
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
            <li>No tasks, add a task </li>
          ) : (
            toDos.map((todo, index) => (
              <li key={index}>
                {todo}
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
      <div className="container-2"></div>
      <div className="container-3"></div>
    </div>
  );
};

export default Home;
