import express from "express"
import errorMiddleware from "./middlewares/error.js"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"

import product from "./routes/productRoutes.js"
import user from "./routes/userRoutes.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/v1", product)
app.use("/api/v1", user)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

// error middleware
app.use(errorMiddleware)

export default app
