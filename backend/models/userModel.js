const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"]
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "Email is already registered"]
  },
  password: {
    type: String,
    maxLength: 20,
    minLength: 8
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (val) {
        val === this.password
      },
      message: "Confirm password is not equal to password"
    },
    required: [true, "Please provide confirm password"]
  },
  profilePic: String
})

// Run middleware before saving the document to remove confirmPassword and hashing the password
userSchema.pre("save", async function (next) {
  // Remove confirm password we dont need it
  this.confirmPassword = undefined
  // Create Hash
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.isPasswordCorrect = async (password, hashedPassword) => {
  // Check if the password is correct
  const result = await bcrypt.compare(password, hashedPassword)
  return result
}
const User = mongoose.model("User", userSchema)

module.exports = User
