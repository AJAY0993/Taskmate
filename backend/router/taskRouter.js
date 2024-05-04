const express = require("express")
const { isAuthenticated } = require("./../controller/authController")
const {
  getTasks,
  createTask,
  getMyTasks,
  getTask,
  updateTask,
  deleteTask
} = require("../controller/taskController")

const taskRouter = express.Router()

taskRouter.use(isAuthenticated)
taskRouter.route("/").get(getTasks).post(createTask)
taskRouter.route("/my").get(getMyTasks)
taskRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = taskRouter
