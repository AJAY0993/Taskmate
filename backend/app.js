const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const userRouter = require("./router/userRouter")
const taskRouter = require("./router/taskRouter")
const boardRouter = require("./router/boardRouter")

dotenv.config()
const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.WHITELIST_ORIGIN, credentials: true })) // Allow cross origin requests
app.use(morgan())
app.use(express.json()) // Enables to send and accept JSON
app.use(express.urlencoded({ extended: true })) // Add data sent in req.body
app.use(cookieParser()) // To parse cookies : Adding cookies in req.cookies
app.use("/api/v1/users/", userRouter)
app.use("/api/v1/tasks/", taskRouter)
app.use("/api/v1/boards/", boardRouter)

// Catch all the unhandles request
app.all("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} not found on this server.`
  })
})

module.exports = app
