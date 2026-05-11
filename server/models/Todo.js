import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  user: {
    type: String,  // Will store Google ID or guest ID
    required: true,
    index: true    // For faster queries
  }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;