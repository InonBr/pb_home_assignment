import mongoose from "mongoose";

export const objectIdValidator = (value: string | undefined) =>
  value === undefined || mongoose.Types.ObjectId.isValid(value);

export interface UserDataInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  creationDate: string;
}
