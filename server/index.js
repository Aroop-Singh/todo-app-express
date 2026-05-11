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

// Middleware to get user ID (works for both Google auth and guests)
const getUser = (req) => {
  // If logged in with Google, use their Google ID
  if (req.user && req.user.id) {
    return req.user.id;
  }
  // If guest, use the guest ID from the request header
  return req.headers['x-guest-id'] || 'anonymous';
};

// GET TODOS - Only get todos for this user
app.get("/api/todos", async (req, res) => {
  const user = getUser(req);
  const todos = await Todo.find({ user: user });
  res.json(todos);
});

// CREATE TODO - Attach user to the todo
app.post("/api/todos", async (req, res) => {
  const user = getUser(req);
  const newTodo = await Todo.create({
    title: req.body.title,
    completed: false,
    user: user  // This is the key change!
  });

  res.status(201).json(newTodo);
});

// UPDATE TODO - Only if it belongs to this user
app.put("/api/todos/:id", async (req, res) => {
  const user = getUser(req);
  const { title, completed } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: user },  // Only update if it belongs to this user
    { title, completed },
    { new: true }
  );

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ success: true });
});

// DELETE TODO - Only if it belongs to this user
app.delete("/api/todos/:id", async (req, res) => {
  const user = getUser(req);
  const todo = await Todo.findOneAndDelete({ 
    _id: req.params.id, 
    user: user  // Only delete if it belongs to this user
  });

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ success: true });
});

// START SERVER
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});