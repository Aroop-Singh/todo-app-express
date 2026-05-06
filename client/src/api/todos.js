const BASE_URL = "http://localhost:8000/api/todos";

export const getTodos = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createTodo = async (title) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTodo = async (id, data) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const toggleTodo = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "PUT" });
};

export const deleteTodo = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
