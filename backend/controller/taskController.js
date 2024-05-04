const Task = require("../models/taskModel")

// Create a task
const createTask = async (req, res, next) => {
  try {
    const { title, board, description, dueDate, priority } = req.body
    const user = req.user.id
    const newTask = await Task.create({
      title,
      board,
      description,
      dueDate,
      priority,
      user
    })
    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask })
  } catch (error) {
    error.status(401).json({
      status: "failed",
      message: error.message
    })
  }
}

// get Tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks
    })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// Get my Tasks
const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks
    })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// GET task by ID
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task)
      return res.status(401).json({ message: "No task found with this id" })
    res.status(200).json({
      message: "Task fetched successfully",
      task
    })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// Update a task
const updateTask = async (req, res, next) => {
  try {
    // Check if task exist
    let task = await Task.findById(req.params.id)
    if (!task)
      return res.status(400).json({ message: "No task found with this ID" })

    // Check if creator is the one who sent the request to update it
    if (task.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" })

    // If Everything is OK update the task
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!task)
      return res.status(401).json({ message: "No task found with this id" })
    return res.status(200).json({ message: "Task updated successfully", task })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// Delete a task
const deleteTask = async (req, res, next) => {
  try {
    // Check if task exist
    const task = await Task.findById(req.params.id)
    if (!task)
      return res.status(400).json({ message: "No task found with this ID" })

    // Check if creator is the one who sent the request to delete it
    if (task.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" })

    // If Everything is OK delete the task
    await Task.findByIdAndDelete(req.params.id)
    return res.status(204).json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

module.exports = {
  createTask,
  getTask,
  getTasks,
  getMyTasks,
  updateTask,
  deleteTask
}
