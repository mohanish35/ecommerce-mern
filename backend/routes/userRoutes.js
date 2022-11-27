import express from "express"
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
  updateUserRole,
} from "../controllers/userControllers.js"
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js"

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").patch(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/logout").get(isAuthenticatedUser, logoutUser)
router.route("/password/update").patch(isAuthenticatedUser, updatePassword)
router.route("/me/update").patch(isAuthenticatedUser, updateUserProfile)
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

export default router
