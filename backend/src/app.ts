import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import userRouter from "./router/userRouter"
import taskRouter from "./router/taskRouter"
import boardRouter from "./router/boardRouter"

dotenv.config({ path: "../.env" })
const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.WHITELIST_ORIGIN, credentials: true })) // Allow cross origin requests
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(express.json()) // Enables to send and accept JSON
app.use(express.urlencoded({ extended: true })) // Add data sent in req.body
app.use(cookieParser()) // To parse cookies : Adding cookies in req.cookies
app.use("/api/v1/users/", userRouter)
app.use("/api/v1/tasks/", taskRouter)
app.use("/api/v1/boards/", boardRouter)

// Catch all the unhandles request
app.all("*", (req: express.Request, res: express.Response) => {
  res.status(404).json({
    message: `${req.originalUrl} not found on this server.`
  })
})

export default app
