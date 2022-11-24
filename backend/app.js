import express from "express"
import product from "./routes/productRoute.js"
import errorMiddleware from "./middlewares/error.js"

const app = express()

app.use(express.json())

// route imports
app.use("/api/v1", product)

// error middleware
app.use(errorMiddleware)

export default app
