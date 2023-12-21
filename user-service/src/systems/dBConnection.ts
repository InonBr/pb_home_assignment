import { connectionString } from "@config/index";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(connectionString ?? "");

    return mongoose;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }

    // exit process if cannot connect!
    process.exit(1);
  }
};

export default connectDB;
