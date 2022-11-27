import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncError from "./catchAsyncError.js"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new ErrorHandler("Please login to access this resourse", 401))
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decodedData.id)

  next()
})

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user

    if (!roles.includes(role)) {
      next(
        new ErrorHandler(
          `Role ${role} is not allowed to access this resource`,
          403
        )
      )
    }

    next()
  }
}
