import express from "express"
import errorMiddleware from "./middlewares/error.js"
import cookieParser from "cookie-parser"

import product from "./routes/productRoutes.js"
import user from "./routes/userRoutes.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/v1", product)
app.use("/api/v1", user)

// error middleware
app.use(errorMiddleware)

export default app
