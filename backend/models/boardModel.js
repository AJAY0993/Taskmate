const mongoose = require("mongoose")

const boardSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  Tasks: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
    default: []
  },
  tags: [String]
})

const Board = mongoose.model("Board", boardSchema)

module.exports = Board
