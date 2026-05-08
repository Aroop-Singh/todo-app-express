// Use the environment variable instead of hardcoded URL
const BASE_URL = import.meta.env.VITE_API_URL || 
"https://todo-app-express-backend-yul8.onrender.com";

// Fix the API endpoints to match your backend routes
export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/api/todos`);
  return res.json();
};

export const createTodo = async (title) => {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTodo = async (id, data) => {
  await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const toggleTodo = async (id) => {
  await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true }) // Assuming toggle just marks as complete
  });
};

export const deleteTodo = async (id) => {
  await fetch(`${BASE_URL}/api/todos/${id}`, { method: "DELETE" });
};