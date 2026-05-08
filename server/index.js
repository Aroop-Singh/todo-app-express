import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import Todo from "./models/Todo.js";

import "./config/passport.js";

dotenv.config();

const app = express();


// Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


// for google auth
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Server running");
});


// ================= AUTH ROUTES =================

// GOOGLE LOGIN
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// CALLBACK
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL}/todos`,
    failureRedirect: "/login",
  })
);

// LOGIN SUCCESS
app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
    });
  }
});

// LOGOUT
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});


// ================= TODO ROUTES =================

// GET TODOS
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// CREATE TODO
app.post("/api/todos", async (req, res) => {
  const newTodo = await Todo.create({
    title: req.body.title,
  });

  res.status(201).json(newTodo);
});

// UPDATE TODO
app.put("/api/todos/:id", async (req, res) => {
  const { title, completed } = req.body;

  await Todo.findByIdAndUpdate(req.params.id, {
    title,
    completed,
  });

  res.json({ success: true });
});

// DELETE TODO
app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.json({ success: true });
});


// START SERVER
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});