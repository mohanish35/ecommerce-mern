import ErrorHandler from "../utils/errorHandler.js"

export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.message = error.message || "Internal Server Error"

  // Wrong MongoDB ObjectID Error
  if (error.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${error.path}`
    error = new ErrorHandler(message, 400)
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  })
}
