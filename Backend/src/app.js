import express from "express"
import cors from "cors"
import pmRoutes from "./routes/pmRoutes.js"
import streamRoutes from "./routes/streamRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import architectureRoutes from "./routes/architectureRoutes.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/pm", pmRoutes)
app.use("/api/stream", streamRoutes)
app.use("/api/architecture", architectureRoutes)


app.get("/", (req, res) => {
  res.send("AI Product Manager Backend Running 🚀")
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  next()
})


app.use(errorHandler)

export default app;