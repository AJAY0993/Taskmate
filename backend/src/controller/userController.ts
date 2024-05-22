import express from "express"
import User from "../models/userModel"
import Task from "../models/taskModel"
import Board from "../models/boardModel"
import lodash from "lodash"

export const getMe = async (req: express.Request, res: express.Response) => {
  const userId = lodash.get(req, "user.id")
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
