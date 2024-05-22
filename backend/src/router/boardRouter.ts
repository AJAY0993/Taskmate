import express from "express"

import {
  getBoard,
  createBoard,
  getBoards,
  getMyBoards,
  updateBoard,
  deleteBoard
} from "../controller/boardController"
const { isAuthenticated } = require("../controller/authController")

const boardRouter = express.Router()

boardRouter.use(isAuthenticated)
boardRouter.route("/").get(getBoards).post(createBoard)
boardRouter.route("/my").get(getMyBoards)
boardRouter.route("/:id").get(getBoard).patch(updateBoard).delete(deleteBoard)

export default boardRouter
