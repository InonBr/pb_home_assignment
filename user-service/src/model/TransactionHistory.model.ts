import mongoose from "mongoose";

const TransactionHistory = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
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

export default mongoose.model("transactionHistory", TransactionHistory);
