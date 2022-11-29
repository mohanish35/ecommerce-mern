import app from "./app.js"
import dotenv from "dotenv"
import connectDatabase from "./config/database.js"
import os from "os"

// Uncaught Exception
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`)
  console.log("Shutting down the server due to Uncaught Exception.")

  server.close(() => {
    process.exit(1)
  })
})

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

// connect DB
connectDatabase()

const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(
    `🚀 Server started on host '${os.hostname()}' on port '${port}'`
  )
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`)
  console.log("Shutting down the server due to Unhandled Promise Rejection.")

  server.close(() => {
    process.exit(1)
  })
})
