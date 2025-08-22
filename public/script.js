async function Signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  await axios.post("/api/signup", { username, password });
  alert("You have signed up");
  renderUI();
}

async function Signin() {
  const username = document.getElementById("signinUsername").value;
  const password = document.getElementById("signinPassword").value;

  try {
    const response = await axios.post("/api/signin", { username, password });
    localStorage.setItem("token", response.data.token);
    alert("You are signed in");
    renderUI();
  } catch (err) {
    alert("Invalid credentials or error while signing in");
  }
}

async function getUserInfo() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.get("/api/me", {
      headers: { Authorization: "Bearer " + token }
    });
    return response.data;
  } catch (err) {
    localStorage.removeItem("token");
    return null;
  }
}

function logout() {
  localStorage.removeItem("token");
  alert("You have logged out");
  renderUI();
}

async function renderUI() {
  const user = await getUserInfo();
  const authSection = document.getElementById("authSection");
  const todoSection = document.getElementById("todoSection");
  const userInfo = document.getElementById("UserInfo");

  if (user) {
    authSection.style.display = "none";
    todoSection.style.display = "block";
    userInfo.innerText = `Welcome ${user.username}`;
  } else {
    authSection.style.display = "block";
    todoSection.style.display = "none";
    userInfo.innerText = "";
  }
}

renderUI();
