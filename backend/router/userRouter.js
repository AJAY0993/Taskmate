const express = require("express")
const {
  signUp,
  login,
  isAuthenticated,
  logout
} = require("./../controller/authController")
const { getMe } = require("../controller/userController")

const router = express.Router()

router.route("/login").post(login)
router.route("/signup").post(signUp)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated, getMe)

module.exports = router
