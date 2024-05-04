const User = require("../models/userModel")
const Task = require("../models/taskModel")
const Board = require("../models/boardModel")

const getMe = async (req, res) => {
  const user = await User.findById(req.user.id)
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

module.exports = { getMe }
