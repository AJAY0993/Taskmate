import mongoose from "mongoose"
import bcrypt from "bcrypt"
const { Document } = mongoose
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
      validator: function (val: string): boolean {
        return val === this.password
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

userSchema.methods.isPasswordCorrect = async (
  password: string,
  hashedPassword: string
) => {
  // Check if the password is correct
  const result = await bcrypt.compare(password, hashedPassword)
  return result
}

export interface UserDocument extends Document {
  username: string
  email: string
  password: string
  confirmPassword: string
  profilePic: string
  _id: string

  isPasswordCorrect(candidatePassword: string, hashedPassword: string): boolean
}
const User = mongoose.model<UserDocument>("User", userSchema)

export default User
