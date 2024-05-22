import express from "express"
import { promisify } from "util"
import jwt from "jsonwebtoken"
import User, { UserDocument } from "../models/userModel"
import { merge } from "lodash"

const genToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d"
  })
}

const genTokenandSendRes = (user: UserDocument, res: express.Response) => {
  // Generate JWT token
  const token = genToken(user._id)
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 30) // 30

  res
    .status(201)
    .cookie("jwt", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: expiryDate,
      sameSite: "none"
    })
    .json({
      status: "success",
      message: "Welcome",
      user,
      token
    })
}

// Signup Functionality

export const signUp = async (req: express.Request, res: express.Response) => {
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

export const login = async (req: express.Request, res: express.Response) => {
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
export const logout = (req: express.Request, res: express.Response) => {
  res.cookie("jwt", "")
  res.json({ message: "Logged out" })
}

// Auth middleware
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { jwt: jwtToken } = req.cookies

  // Check if token is Provided
  if (!jwtToken) {
    return res.status(401).json({
      status: "failed",
      message: "Please provide Token"
    })
  }

  // Check if token is valid
  let decoded, userId
  try {
    decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
    if (typeof decoded !== "string" && "id" in decoded) {
      const userId = decoded.id
      console.log("User ID:", userId)
    }
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid token or token expired Please login again"
    })
  }
  // Check if user still exist
  const user = await User.findById(userId)
  if (!user)
    return res.status(401).json({
      status: "failed",
      message: "User does not exist anymore"
    })

  merge(req, { user: decoded })

  next()
}
