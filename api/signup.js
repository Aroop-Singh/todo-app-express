import jwt from "jsonwebtoken";

let users = []; // memory store (will reset on serverless cold start)

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || username.length < 5) {
      return res.status(400).json({ message: "Username too short" });
    }

    users.push({ username, password });
    return res.status(200).json({ message: "You are signed up" });
  }
  res.status(405).json({ message: "Method not allowed" });
}
