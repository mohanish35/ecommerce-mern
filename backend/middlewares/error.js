import ErrorHandler from "../utils/errorHandler.js"

export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.message = error.message || "Internal Server Error"

  // Wrong MongoDB ObjectID Error
  if (error.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${error.path}`
    error = new ErrorHandler(message, 400)
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(message, 400)
  }

  // Wrong JWT error
  if (error.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`
    err = new ErrorHandler(message, 400)
  }

  // JWT expire error
  if (error.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again`
    err = new ErrorHandler(message, 400)
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  })
}
