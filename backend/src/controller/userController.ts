import express from "express"
import User from "../models/userModel.js"
import Task from "../models/taskModel.js"
import Board from "../models/boardModel.js"
import { get } from "lodash"

export const getMe = async (req: express.Request, res: express.Response) => {
  const userId = get(req, "user.id")
  const user = await User.findById(userId)
  const boards = await Board.find({ user: user._id })
  const tasks = await Task.find({ user: user._id })
  res.status(200).json({
    message: "",
    status: "success",
    user,
    boards,
    tasks
  })
}
