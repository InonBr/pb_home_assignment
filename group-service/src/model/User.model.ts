import mongoose from "mongoose";

const User = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  balance: {
    type: Number,
    default: 0,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("user", User);
