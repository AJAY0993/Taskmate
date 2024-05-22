import express from "express"
import Task from "../models/taskModel"
import { get } from "lodash"

// Create a task
export const createTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, board, description, dueDate, priority } = req.body
    const user = get(req, "user.id")
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
export const getTasks = async (req: express.Request, res: express.Response) => {
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
export const getMyTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tasks = await Task.find({ user: get(req, "user.id") })
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
export const getTask = async (req: express.Request, res: express.Response) => {
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
export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Check if task exist
    let task = await Task.findById(req.params.id)
    if (!task)
      return res.status(400).json({ message: "No task found with this ID" })

    // Check if creator is the one who sent the request to update it
    if (task.user.toString() !== get(req, "user.id"))
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
export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Check if task exist
    const task = await Task.findById(req.params.id)
    if (!task)
      return res.status(400).json({ message: "No task found with this ID" })

    // Check if creator is the one who sent the request to delete it
    if (task.user.toString() !== get(req, "user.id"))
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
