import mongoose from "mongoose";

export const objectIdValidator = (value: string | undefined) =>
  value === undefined || mongoose.Types.ObjectId.isValid(value);
