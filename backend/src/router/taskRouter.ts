import express from "express"
import { isAuthenticated } from "../controller/authController"
import {
  getTasks,
  createTask,
  getMyTasks,
  getTask,
  updateTask,
  deleteTask
} from "../controller/taskController"

const taskRouter = express.Router()

taskRouter.use(isAuthenticated)
taskRouter.route("/").get(getTasks).post(createTask)
taskRouter.route("/my").get(getMyTasks)
taskRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

export default taskRouter
