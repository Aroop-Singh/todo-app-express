import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
let users = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const foundUser = users.find(u => u.username === username && u.password === password);
    if (!foundUser) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }
  res.status(405).json({ message: "Method not allowed" });
}
