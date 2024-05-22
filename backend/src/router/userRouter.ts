import express from "express"
import {
  signUp,
  login,
  isAuthenticated,
  logout
} from "../controller/authController"
import { getMe } from "../controller/userController"

const router = express.Router()

router.route("/login").post(login)
router.route("/signup").post(signUp)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated, getMe)

export default router
