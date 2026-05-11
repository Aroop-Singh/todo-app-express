const BASE_URL = import.meta.env.VITE_API_URL || 
"https://todo-app-express-backend-yul8.onrender.com";

// Helper to get the current user ID
const getUserId = () => {
  // Check if logged in user exists (you'll need to store this somewhere in your app state)
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.id || user.googleId;  // Whatever field has the Google ID
  }
  
  // For guests, use a stored guest ID
  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = 'guest_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
};

// Helper to add user header to requests
const authHeaders = () => {
  const userId = getUserId();
  return {
    "Content-Type": "application/json",
    "x-guest-id": userId  // This will be used by the backend
  };
};

export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    headers: authHeaders(),
    credentials: 'include'  // Important for cookies/sessions
  });
  return res.json();
};

export const createTodo = async (title) => {
  const res = await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    headers: authHeaders(),
    credentials: 'include',
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTodo = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const toggleTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    credentials: 'include',
    body: JSON.stringify({ completed: true }),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
    credentials: 'include',
  });
};