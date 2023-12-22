import mongoose from "mongoose";

const Transaction = new mongoose.Schema({
  fromId: {
    type: String,
    trim: true,
    required: true,
  },
  toId: {
    type: String,
    trim: true,
    required: true,
  },
  toGroup: {
    type: Boolean,
    required: true,
  },
  fromGroup: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ["waiting", "done", "canceled"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("transaction", Transaction);
