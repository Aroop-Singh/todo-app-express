import '../App.css'

import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todos";

const API_URL = import.meta.env.VITE_API_URL || 
"https://todo-app-express-backend-yul8.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Check if user is logged in on component mount
  useEffect(() => {
    // Check Google auth status
    fetch(`${API_URL}/login/success`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          // Store user info for the API calls
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          // For guests, ensure we have a guest ID
          if (!localStorage.getItem('guestId')) {
            const guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('guestId', guestId);
          }
        }
      })
      .catch(err => {
        // If fetch fails, still set up guest ID
        if (!localStorage.getItem('guestId')) {
          const guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('guestId', guestId);
        }
      })
      .finally(() => {
        // Load todos after authentication check
        getTodos().then(setTodos);
      });
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    const newTodo = await createTodo(title);
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const toggleTodo = async (todo) => {
    await updateTodo(todo._id, {
      completed: !todo.completed,
    });

    setTodos(
      todos.map(t =>
        t._id === todo._id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const saveEdit = async (_id) => {
    await updateTodo(_id, { title: editTitle });

    setTodos(
      todos.map(t =>
        t._id === _id ? { ...t, title: editTitle } : t
      )
    );

    setEditingId(null);
    setEditTitle("");
  };

  const removeTodo = async (_id) => {
    await deleteTodo(_id);
    setTodos(todos.filter(t => t._id !== _id));
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "0 auto" }}>
      <h1>Todo App</h1>

      {/* Add Todo */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            onClick={() => toggleTodo(todo)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
            }}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
            />

            {/* Title / Edit */}
            {editingId === todo._id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {todo.title}
              </span>
            )}

            {/* Edit / Save */}
            {editingId === todo._id ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  saveEdit(todo._id);
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(todo._id);
                  setEditTitle(todo.title);
                }}
              >
                Edit
              </button>
            )}

            {/* Delete */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(todo._id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;