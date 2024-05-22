import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  title: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  board: {
    type: mongoose.Schema.ObjectId,
    ref: "Board"
  },
  description: {
    type: String
  },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  tags: [String],
  status: {
    type: String,
    enum: {
      values: ["todo", "inProgress", "completed"],
      message:
        "A task's status can only be either 'todo', 'inProgress', or 'completed'"
    },
    default: "todo"
  }
})

const Task = mongoose.model("Task", taskSchema)
export default Task
