const { promisify } = require("util")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const genToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

const genTokenandSendRes = (user, res) => {
  // Generate JWT token
  const token = genToken(user._id)
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 30) // 30

  res
    .status(201)
    .cookie("jwt", token, {
      secure: process.env.NODE_ENV === "production",
      expires: expiryDate
    })
    .json({
      status: "success",
      message: "Welcome",
      user,
      token
    })
}

// Signup Functionality

const signUp = async (req, res, next) => {
  // Check Fields are not empty
  const { username, email, password, confirmPassword } = req.body

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide required fields"
    })
  }

  // Check password and confirm password are equal
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "failed",
      message: "Passwords do not match"
    })
  }

  // Check user with same does not exist already
  const user = await User.findOne({ email })
  if (user)
    return res.status(401).json({
      status: "failed",
      message: `User with email ${email} already exist`
    })

  const profilePic = `https://avatar.iran.liara.run/public/?username=${username}`

  // Create a new User
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
    profilePic
  })

  newUser.password = undefined

  // Send response
  genTokenandSendRes(newUser, res)
}

// Login Functionality

const login = async (req, res, next) => {
  const { email, password } = req.body

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide required fields"
    })
  }
  // Check if user exist
  const user = await User.findOne({ email }).select("+password")
  // Check if password is correct
  if (!user || !(await user.isPasswordCorrect(password, user.password))) {
    return res.status(401).json({
      status: "failed",
      message: "Incorrect email or password"
    })
  }

  user.password = undefined
  genTokenandSendRes(user, res)
}

// Logout
const logout = (req, res) => {
  res.cookie("jwt", "")
  res.json({ message: "Logged out" })
}

// Auth middleware
const isAuthenticated = async (req, res, next) => {
  const { jwt: jwtToken } = req.cookies

  // Check if token is Provided
  if (!jwtToken) {
    return res.status(401).json({
      status: "failed",
      message: "Please provide Token"
    })
  }

  // Check if token is valid
  let decoded
  try {
    decoded = await promisify(jwt.verify)(jwtToken, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid token or token expired Please login again"
    })
  }
  // Check if user still exist
  const user = await User.findById(decoded.id)
  if (!user)
    return res.status(401).json({
      status: "failed",
      message: "User does not exist anymore"
    })

  req.user = {
    ...decoded
  }
  next()
}

module.exports = {
  signUp,
  login,
  logout,
  isAuthenticated
}
