const Board = require("../models/boardModel")

// create board
const createBoard = async (req, res, next) => {
  try {
    const { title, description } = req.body
    const user = req.user.id
    console.log(req.body)
    const newBoard = await Board.create({
      title,
      description,
      user
    })
    return res
      .status(201)
      .json({ message: "Board created successfully", board: newBoard })
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error.message
    })
  }
}

// get all boards
const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find()
    res.status(200).json({
      message: "Boards fetched successfully",
      boards
    })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// get only my boards
const getMyBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({ user: req.user.id })
    res.status(200).json({
      message: "Boards fetched successfully",
      boards
    })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// get board by ID
const getBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id)
    if (!board)
      return res.status(401).json({ message: "No Board found with this id" })
    res.status(200).json({
      message: "Board fetched successfully",
      board
    })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// update board
const updateBoard = async (req, res, next) => {
  try {
    // Check if Board exist
    let board = await Board.findById(req.params.id)
    if (!board)
      return res.status(400).json({ message: "No board found with this ID" })

    // Check if creator is the one who sent the request to update it
    if (board.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "You are not authorized to update this Board" })

    // If Everything is OK update the Board
    board = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!board)
      return res.status(401).json({ message: "No Board found with this id" })
    return res
      .status(200)
      .json({ message: "Board updated successfully", board })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

// delete board
const deleteBoard = async (req, res, next) => {
  try {
    // Check if Board exist
    let board = await Board.findById(req.params.id)
    if (!board)
      return res.status(400).json({ message: "No board found with this ID" })

    // Check if creator is the one who sent the request to delete it
    if (board.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this Board" })

    // If Everything is OK delete the Board
    board = await Board.findByIdAndDelete(req.params.id)
    if (!board)
      return res.status(401).json({ message: "No Board found with this id" })
    return res.status(204).json({ message: "Board deleted successfully" })
  } catch (error) {
    res.status(401).json({
      staus: "failed",
      message: error.message
    })
  }
}

module.exports = {
  createBoard,
  getBoard,
  getBoards,
  getMyBoards,
  updateBoard,
  deleteBoard
}
