import React, { useState } from "react";
import style from "../../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleNewTask = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setToDos([...toDos, inputValue]);
      setInputValue("");
    }
  };
  const handleRemoveTask = (index) => {
    const newToDos = toDos.filter((_, i) => i !== index);
    setToDos(newToDos);
  };
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
