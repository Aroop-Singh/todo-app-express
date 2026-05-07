import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Todo App</h1>

      <a href="https://todov2.onrender.com/auth/google">
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