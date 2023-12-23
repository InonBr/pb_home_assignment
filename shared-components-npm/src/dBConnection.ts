import mongoose from "mongoose";

const connectDB = async (connectionString: string) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(connectionString);

    return mongoose;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unexpected error", err);
    }

    // exit process if cannot connect!
    throw new Error("cannot connect db!!");
  }
};

export default connectDB;
