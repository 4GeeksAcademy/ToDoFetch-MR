import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ user_name, setUser_name }) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(`https://playground.4geeks.com/todo/users/${user_name}`)
      .then((response) => response.json())
      .then((data) => setTodos(data.todos || []))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [user_name]);

  const addNewTask = () => {
    if (!inputValue.trim()) return;

    const newTask = { label: inputValue.trim(), is_done: false };
    setInputValue("");

    fetch(`https://playground.4geeks.com/todo/todos/${user_name}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleCleanAllTasks = async () => {
    try {
      await fetch(`https://playground.4geeks.com/todo/users/${user_name}`, {
        method: "DELETE",
      });
      setTodos([]);
      setUser_name(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <h2>{user_name}'s To-Do List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addNewTask();
        }}
        placeholder="Add a new task"
      />
      <ul>
        {todos.length === 0 ? (
          <li>No tasks, add a task</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id || todo.label}>
              <span>{todo.label}</span>
              <button onClick={() => deleteTask(todo.id)}>
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
