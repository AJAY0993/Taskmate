import mongoose from "mongoose"
import app from "./app"
const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to DATABASE")
    app.listen(PORT, () => {
      console.log(`App is listening at ${PORT}. Go catch it!`)
    })
  })
  .catch((err) => console.log(err))
