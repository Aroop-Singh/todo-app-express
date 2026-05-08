import { useNavigate } from "react-router-dom";

// Use environment variable
const API_URL = import.meta.env.VITE_API_URL || 
"https://todo-app-express-backend-yul8.onrender.com";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Todo App</h1>

      <a href={`${API_URL}/auth/google`}>
        <button>Login with Google</button>
      </a>

      <br />
      <br />

      <button onClick={() => navigate("/todos")}>
        Continue as Guest
      </button>
    </div>
  );
}

export default Login;