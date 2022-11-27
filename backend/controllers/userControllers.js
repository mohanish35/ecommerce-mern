import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncErrors from "../middlewares/catchAsyncError.js"
import User from "../models/userModel.js"
import sendToken from "../utils/jwtToken.js"
import sendEmail from "../utils/sendEmail.js"
import crypto from "crypto"

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "pfp url",
    },
  })

  sendToken(user, 201, res)
})

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400))
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }

  sendToken(user, 200, res)
})

export const logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "User logged out",
  })
}

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  const resetToken = await user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`

  const message = `Your password reset token is:\n\n ${resetPasswordUrl}\n\n If you have not requested password reset, please ignore.`

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler(error.message, 500))
  }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or expired", 400)
    )
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, 200, res)
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400))
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password do not match", 400))
  }

  user.password = req.body.newPassword

  await user.save()

  sendToken(user, 200, res)
})

export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  // TODO add cloudinary

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
  })
})

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler("User does not exists"))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    message: "Role updated successfully ",
  })
})

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler("User does not exists.", 400))
  }

  await user.remove()

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  })
})
