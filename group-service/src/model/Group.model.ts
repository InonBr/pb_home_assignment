import mongoose from "mongoose";

const Group = new mongoose.Schema({
  groupName: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  usersArr: {
    type: [String],
    required: true,
  },
  adminsArr: {
    type: [String],
    required: true,
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

export default mongoose.model("group", Group);
