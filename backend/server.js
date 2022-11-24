import app from "./app.js"
import dotenv from "dotenv"
import connectDatabase from "./config/database.js"

// config
dotenv.config({ path: "backend/config/config.env" })

// connect DB
connectDatabase()

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port} 🚀`)
})
