import '../App.css'

import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Fetch todos on load
  useEffect(() => {
    getTodos().then(setTodos);
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
