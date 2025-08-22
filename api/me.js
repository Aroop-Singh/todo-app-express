import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
let users = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const foundUser = users.find(u => u.username === decoded.username);

      if (foundUser) {
        return res.status(200).json({
          username: foundUser.username,
          password: foundUser.password
        });
      } else {
        return res.status(403).json({ message: "User not found" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
  res.status(405).json({ message: "Method not allowed" });
}
